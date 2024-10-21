import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMessageDto } from './dtos/send-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('/create_session')
  async createSession(): Promise<{
    sessionId: string;
  }> {
    return await this.appService.createSession();
  }

  @Post('/send_message')
  @HttpCode(200)
  async sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<{
    chatbot_response: string;
  }> {
    return await this.appService.sendMessage(sendMessageDto);
  }
}
