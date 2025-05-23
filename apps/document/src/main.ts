import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { Logger } from 'nestjs-pino'
import { DocumentModule } from './document.module'

async function bootstrap() {
    const app = await NestFactory.create(DocumentModule)
    const configService = app.get(ConfigService)

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.useLogger(app.get(Logger))

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: configService.get('DOCUMENT_PORT'),
        },
    })

    await app.startAllMicroservices()
}
bootstrap()
