import { JwtAuthGuard, Roles } from '@app/common';
import { Message, Session } from '@app/common/types';
import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SendMessageDto } from './dtos/send-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/get_session')
  async getSession(@Query('sessionId') sessionId: string): Promise<Session> {
    return await this.appService.getSession(sessionId);
  }

  @Get('/create_session')
  async createSession(): Promise<Partial<Session>> {
    return await this.appService.createSession();
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
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
