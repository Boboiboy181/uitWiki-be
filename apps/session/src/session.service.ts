import { Message } from '@app/common/types';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SessionDocument } from './models/session.schema';
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

  async addMessage(sessionId: string, message: Message): Promise<void> {
    await this.sessionRepository.findOneAndUpdate(
      { sessionId },
      {
        $push: {
          messages: message,
        },
      },
    );
  }

  async getSession(sessionId: string): Promise<SessionDocument> {
    if (!sessionId) return {} as SessionDocument;

    return await this.sessionRepository.findOne({ sessionId });
  }
}
