import { CreateCacheDto, UpdateCacheDto, UpsertDocumentDto } from '@app/common'
import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ChatbotService } from './chatbot.service'

@Controller()
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}

    @MessagePattern('hello')
    getHello(): string {
        return this.chatbotService.getHello()
    }

    @MessagePattern('sendMessage')
    async sendMessage(user_question: string): Promise<string> {
        return this.chatbotService.sendMessage(user_question)
    }

    @MessagePattern('upsertDocument')
    async upsertDocument(upsertDocumentDto: UpsertDocumentDto): Promise<string> {
        return this.chatbotService.upsertDocument(upsertDocumentDto)
    }

    @MessagePattern('findAllCachedKeys')
    async findAllCachedKeys() {
        return this.chatbotService.findAllCachedKeys()
    }

    @MessagePattern('findOneCachedKey')
    async findOneCachedKey(_id: string) {
        return this.chatbotService.findOneCachedKey(_id)
    }

    @MessagePattern('createCachedKey')
    async findAllDocuments(createCacheDto: CreateCacheDto) {
        return this.chatbotService.createCachedKey(createCacheDto)
    }

    @MessagePattern('updateCachedKey')
    async updateCachedKey(payload: {
        _id: string
        updateCacheDto: UpdateCacheDto
    }) {
        return this.chatbotService.updateCachedKey(payload._id, payload.updateCacheDto)
    }

    @MessagePattern('removeCachedKey')
    async removeCachedKey(_id: string) {
        return this.chatbotService.removeCachedKey(_id)
    }
}
