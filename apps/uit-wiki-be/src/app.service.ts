import { CHATBOT_SERVICE, SESSION_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
    @Inject(SESSION_SERVICE) private readonly sessionService: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    return firstValueFrom(this.chatbotService.send({ cmd: 'hello' }, ''));
  }

  async sendMessage(sendMessageDto: SendMessageDto): Promise<{ chatbot_response: string }> {
    const { user_question } = sendMessageDto;
    const response: string = await firstValueFrom(this.chatbotService.send({ cmd: 'send_message' }, user_question));
    return {
      chatbot_response: response,
    };
  }

  async createSession(): Promise<{ sessionId: string }> {
    const sessionId: string = await firstValueFrom(this.sessionService.send({ cmd: 'create_session' }, ''));
    return {
      sessionId,
    };
  }
}
