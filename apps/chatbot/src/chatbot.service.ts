import { CreateCacheDto, UpdateCacheDto, UpsertDocumentDto } from '@app/common'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class ChatbotService {
    private chatbot_service_url: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.chatbot_service_url = this.configService.get<string>('CHATBOT_API_URL')
    }

    getHello(): string {
        return 'Hello World!'
    }

    async sendMessage(user_question: string): Promise<string> {
        const dataToSent = {
            user_question,
        }

        try {
            const { data } = await firstValueFrom(
                this.httpService.post(`${this.chatbot_service_url}/chat_bot/send_message`, dataToSent),
            )
            return data.response
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }

    async upsertDocument(upsertDocumentDto: UpsertDocumentDto): Promise<string> {
        console.log(`${this.chatbot_service_url}/pinecone/upsert`)
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(`${this.chatbot_service_url}/pinecone/upsert`, upsertDocumentDto),
            )
            return data
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }

    async findAllCachedKeys() {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(`${this.chatbot_service_url}/redis/keys?no_embedding=true`),
            )
            return data
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }

    async findOneCachedKey(_id: string) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(`${this.chatbot_service_url}/redis/get/${_id}?no_embedding=true`),
            )
            return data
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }

    async createCachedKey(createCacheDto: CreateCacheDto) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(`${this.chatbot_service_url}/redis/set?no_embedding=true`, createCacheDto),
            )
            return data
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }

    async updateCachedKey(_id: string, updateCacheDto: UpdateCacheDto) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.put(
                    `${this.chatbot_service_url}/redis/update/${_id}?no_embedding=true`,
                    updateCacheDto,
                ),
            )
            return data
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }

    async removeCachedKey(_id: string) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.delete(`${this.chatbot_service_url}/redis/delete/${_id}?no_embedding=true`),
            )
            return data
        } catch (error) {
            throw new Error(`Chatbot service error: ${error.message}`)
        }
    }
}
