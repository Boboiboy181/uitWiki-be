import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  getHello(): string {
    return 'Hello World!';
  }

  async createSession(): Promise<string> {
    return uuidv4();
  }
}
