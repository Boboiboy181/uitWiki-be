import { Message, Session } from '@app/common/types';
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMessageDto } from './dtos/send-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/get_session')
  async getSession(@Query('sessionId') sessionId: string): Promise<Session> {
    return await this.appService.getSession(sessionId);
  }

  @Get('/get_sessions')
  async getSessions(): Promise<Session[]> {
    return await this.appService.getSessions();
  }

  @Post('/send_message')
  @HttpCode(200)
  async sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<Message> {
    return await this.appService.sendMessage(sendMessageDto);
  }
}
