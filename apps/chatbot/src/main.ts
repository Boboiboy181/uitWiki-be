import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ChatbotModule } from './chatbot.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ChatbotModule, {
    transport: Transport.TCP,
  });

  app.useLogger(app.get(Logger));

  await app.listen();
}
bootstrap();
