import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatbotService } from './chatbot.service';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return this.chatbotService.getHello();
  }
}
