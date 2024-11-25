import { UpsertDocumentDto } from '@app/common/dtos/document';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatbotService } from './chatbot.service';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern('hello')
  getHello(): string {
    return this.chatbotService.getHello();
  }

  @MessagePattern('sendMessage')
  async sendMessage(user_question: string): Promise<string> {
    return this.chatbotService.sendMessage(user_question);
  }

  @MessagePattern('upsertDocument')
  async upsertDocument(upsertDocumentDto: UpsertDocumentDto): Promise<string> {
    return this.chatbotService.upsertDocument(upsertDocumentDto);
  }
}
