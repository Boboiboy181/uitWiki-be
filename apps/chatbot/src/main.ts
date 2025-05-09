import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { Logger } from 'nestjs-pino'
import { ChatbotModule } from './chatbot.module'

async function bootstrap() {
    const app = await NestFactory.create(ChatbotModule)

    const configService = app.get(ConfigService)

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: configService.get('CHATBOT_PORT'),
        },
    })

    app.useLogger(app.get(Logger))

    await app.startAllMicroservices()
}
bootstrap()
