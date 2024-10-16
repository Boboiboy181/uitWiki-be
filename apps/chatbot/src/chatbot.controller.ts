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

  @MessagePattern({ cmd: 'send_message' })
  async sendMessage(user_question: string): Promise<string> {
    return this.chatbotService.sendMessage(user_question);
  }
}
