import { LoggerModule, SESSION_SERVICE, UploadModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/uit-wiki-be/.env',
      validationSchema: Joi.object({
        SESSION_HOST: Joi.string().required(),
        SESSION_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: SESSION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('SESSION_HOST'),
            port: configService.get('SESSION_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    LoggerModule,
    DocumentModule,
    UploadModule,
    AuthModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
