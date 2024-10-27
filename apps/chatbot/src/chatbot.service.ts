import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(user_question: string): Promise<string> {
    const chatbot_service_url = this.configService.get<string>('CHATBOT_API_URL');

    const dataToSent = {
      user_question,
    };

    try {
      const { data } = await firstValueFrom(this.httpService.post(chatbot_service_url, dataToSent));
      return data.response;
    } catch (error) {
      throw new Error(`Chatbot service error: ${error.message}`);
    }
  }
}
