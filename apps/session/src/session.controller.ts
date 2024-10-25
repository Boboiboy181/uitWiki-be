import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SessionDocument } from './models/session.schema';
import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @MessagePattern({ cmd: 'create_session' })
  async createSession(): Promise<string> {
    return this.sessionService.createSession();
  }

  @MessagePattern({ cmd: 'add_message' })
  async addMessage(data: { sessionId: string; message: any }): Promise<void> {
    return this.sessionService.addMessage(data.sessionId, data.message);
  }

  @MessagePattern({ cmd: 'get_session' })
  async getSession(sessionId: string): Promise<SessionDocument> {
    return this.sessionService.getSession(sessionId);
  }
}
