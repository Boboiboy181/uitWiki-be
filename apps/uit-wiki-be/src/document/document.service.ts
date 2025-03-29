import { CHATBOT_SERVICE, DOCUMENT_SERVICE, PineconeService } from '@app/common'
import { CreateDocumentDto, DocumentDto, UpsertDocumentDto } from '@app/common/dtos/document'
import { VectorQueryDto } from '@app/common/dtos/vector'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, map } from 'rxjs'

@Injectable()
export class DocumentService {
    constructor(
        @Inject(DOCUMENT_SERVICE) private readonly documentService: ClientProxy,
        @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
        private readonly pineconeService: PineconeService,
    ) {}

    getClient(): ClientProxy {
        return this.documentService
    }

    async create(createDocumentDto: CreateDocumentDto): Promise<DocumentDto> {
        let document: DocumentDto
        try {
            document = await firstValueFrom(
                this.documentService.send<DocumentDto>('createDocument', createDocumentDto).pipe(
                    map((res) => {
                        return res
                    }),
                ),
            )
            const upsertDocumentDto: UpsertDocumentDto = {
                documentKey: createDocumentDto.documentKey,
                parseType: createDocumentDto.parseType,
                metadata: {
                    ...createDocumentDto.metadata,
                    documentId: document._id,
                    documentUrl: createDocumentDto.documentUrl,
                },
            }
            await firstValueFrom(
                this.chatbotService.send<string>('upsertDocument', upsertDocumentDto).pipe(map((res) => res)),
            )

            return document
        } catch (_error) {
            await this.hardRemove(document._id)
        }
    }

    async remove(_id: string): Promise<any> {
        try {
            const query: VectorQueryDto = {
                indexName: 'cohere',
                filter: {
                    documentId: _id,
                },
            }
            await this.pineconeService.queryVectors(query)
            return await firstValueFrom(this.documentService.send('removeDocument', _id).pipe(map((res) => res)))
        } catch (error) {
            return error
        }
    }

    async hardRemove(_id: string): Promise<any> {
        return await firstValueFrom(this.documentService.send('hardRemove', _id).pipe(map((res) => res)))
    }
}
