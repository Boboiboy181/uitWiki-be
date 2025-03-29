import { fetchSwaggerDocument, mergeSwaggerDocuments } from '@app/common/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    app.useLogger(app.get(Logger))
    app.use(cookieParser())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    app.setGlobalPrefix('api/v1')
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'https://uit-wiki-fe-git-dev-boboiboy181s-projects.vercel.app',
            'https://uit-wiki-fe.vercel.app',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('UIT Wiki API')
        .setDescription('The UIT Wiki API description')
        .setVersion('1.0')
        .addTag('uit-wiki')
        .build()
    const document = () => SwaggerModule.createDocument(app, config)

    const authSwaggerUrl = configService.get('AUTH_URL')
    const authDocument = await fetchSwaggerDocument(authSwaggerUrl)

    let mergeDocument = document()

    if (authDocument) {
        mergeDocument = mergeSwaggerDocuments(document(), authDocument)
    }

    SwaggerModule.setup('/api/v1/api-docs', app, mergeDocument)

    await app.listen(3000)
}
bootstrap()
