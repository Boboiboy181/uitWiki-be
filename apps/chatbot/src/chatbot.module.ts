import { ConfigModule, LoggerModule } from '@app/common';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [ConfigModule, LoggerModule, HttpModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
