import { CHATBOT_SERVICE, SESSION_SERVICE } from '@app/common';
import { Message } from '@app/common/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class ChatbotService {
  constructor(
    @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
    @Inject(SESSION_SERVICE) private readonly sessionService: ClientProxy,
  ) {}

  getClient(): ClientProxy {
    return this.chatbotService;
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
}
