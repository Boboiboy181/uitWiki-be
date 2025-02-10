import { CHATBOT_SERVICE, SESSION_SERVICE } from '@app/common';
import { Session } from '@app/common/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy,
    @Inject(SESSION_SERVICE) private readonly sessionService: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    return firstValueFrom(this.chatbotService.send('hello', ''));
  }

  async createSession(): Promise<Partial<Session>> {
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
