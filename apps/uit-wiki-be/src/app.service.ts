import { CHATBOT_SERVICE, SESSION_SERVICE } from '@app/common';
import { Message, Session } from '@app/common/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
    @Inject(SESSION_SERVICE) private readonly sessionService: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    return firstValueFrom(this.chatbotService.send('hello', ''));
  }

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    const { user_question, sessionId, timestamp } = sendMessageDto;

    const botResponse: string = await firstValueFrom(this.chatbotService.send('sendMessage', user_question));

    const messages: Message[] = [
      {
        content: user_question,
        sender: 'user',
        timestamp: Number(timestamp),
        messageId: uuidv4(),
      },
      {
        content: botResponse,
        sender: 'bot',
        timestamp: Date.now(),
        messageId: uuidv4(),
      },
    ];

    await this.sessionService.send({ cmd: 'add_message' }, { sessionId, message: messages[0] }).toPromise();
    await this.sessionService.send({ cmd: 'add_message' }, { sessionId, message: messages[1] }).toPromise();

    return messages[1];
  }

  async createSession(): Promise<{ sessionId: string }> {
    const sessionId: string = await firstValueFrom(this.sessionService.send({ cmd: 'create_session' }, ''));
    return {
      sessionId,
    };
  }

  async getSession(sessionId: string): Promise<Session> {
    return await firstValueFrom(this.sessionService.send({ cmd: 'get_session' }, sessionId));
  }

  async getSessions(): Promise<Session[]> {
    return await firstValueFrom(this.sessionService.send({ cmd: 'get_sessions' }, ''));
  }
}
