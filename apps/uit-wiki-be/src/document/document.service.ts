import { CHATBOT_SERVICE, DOCUMENT_SERVICE, PineconeService } from '@app/common';
import { CreateDocumentDto, DocumentDto, UpsertDocumentDto } from '@app/common/dtos/document';
import { VectorQueryDto } from '@app/common/dtos/vector';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class DocumentService {
  constructor(
    @Inject(DOCUMENT_SERVICE) private readonly documentService: ClientProxy,
    @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
    private readonly pineconeService: PineconeService,
  ) {}

  getClient(): ClientProxy {
    return this.documentService;
  }

  async create(createDocumentDto: CreateDocumentDto): Promise<DocumentDto> {
    const document = await firstValueFrom(
      this.documentService.send<DocumentDto>('createDocument', createDocumentDto).pipe(
        map((res) => {
          return res;
        }),
      ),
    );
    const upsertDocumentDto: UpsertDocumentDto = {
      documentKey: createDocumentDto.documentKey,
      metadata: {
        ...createDocumentDto.metadata,
        documentId: document._id,
      },
    };
    await firstValueFrom(this.chatbotService.send<string>('upsertDocument', upsertDocumentDto).pipe(map((res) => res)));

    return document;
  }

  async remove(_id: string): Promise<any> {
    const query: VectorQueryDto = {
      indexName: 'nestjs',
      filter: {
        documentId: _id,
      },
    };
    const response = await this.pineconeService.queryVectors(query);
    return response;
  }
}
