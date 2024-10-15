import { CHATBOT_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject(CHATBOT_SERVICE) private readonly chatbotService: ClientProxy) {}

  async getHello(): Promise<string> {
    return firstValueFrom(this.chatbotService.send({ cmd: 'hello' }, ''));
  }
}
