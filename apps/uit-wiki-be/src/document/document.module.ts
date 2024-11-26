import { DOCUMENT_SERVICE, PineconeModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { AuthModule } from '../auth/auth.module';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/uit-wiki-be/.env',
      validationSchema: Joi.object({
        DOCUMENT_HOST: Joi.string().required(),
        DOCUMENT_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: DOCUMENT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('DOCUMENT_HOST'),
            port: configService.get('DOCUMENT_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
    ChatbotModule,
    PineconeModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
