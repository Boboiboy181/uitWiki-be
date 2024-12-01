import { fetchSwaggerDocument, mergeSwaggerDocuments } from '@app/common/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('UIT Wiki API')
    .setDescription('The UIT Wiki API description')
    .setVersion('1.0')
    .addTag('uit-wiki')
    .build();
  const document = () => SwaggerModule.createDocument(app, config);

  const authSwaggerUrl = 'http://auth:3005/api-docs-json';
  const authDocument = await fetchSwaggerDocument(authSwaggerUrl);

  let mergeDocument = document();

  if (authDocument) {
    mergeDocument = mergeSwaggerDocuments(document(), authDocument);
  }

  SwaggerModule.setup('api-docs', app, mergeDocument);

  await app.listen(3000);
}
bootstrap();
