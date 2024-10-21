import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async createSession(): Promise<string> {
    const newId = uuidv4();

    await this.sessionRepository.create({
      sessionId: newId,
      messages: [],
      isActive: true,
    });

    return newId;
  }
}
