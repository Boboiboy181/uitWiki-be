import { LoggerModule } from '@app/common'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { ChatbotController } from './chatbot.controller'
import { ChatbotGateway } from './chatbot.gateway'
import { ChatbotService } from './chatbot.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/chatbot/.env',
            validationSchema: Joi.object({
                CHATBOT_API_URL: Joi.string().required(),
                CHATBOT_PORT: Joi.number().required(),
            }),
        }),
        LoggerModule,
        HttpModule,
    ],
    controllers: [ChatbotController],
    providers: [ChatbotService, ChatbotGateway],
})
export class ChatbotModule {}
