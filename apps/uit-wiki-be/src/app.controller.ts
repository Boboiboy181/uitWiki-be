import { JwtAuthGuard, Roles } from '@app/common';
import { Session } from '@app/common/types';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AppService } from './app.service';

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
}
