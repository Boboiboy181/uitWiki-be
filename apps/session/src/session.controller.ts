import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @MessagePattern({ cmd: 'create_session' })
  async createSession(): Promise<string> {
    return this.sessionService.createSession();
  }
}
