import { CHATBOT_SERVICE, LoggerModule, SESSION_SERVICE, UploadModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/uit-wiki-be/.env',
      validationSchema: Joi.object({
        CHATBOT_HOST: Joi.string().required(),
        CHATBOT_PORT: Joi.number().required(),
        SESSION_HOST: Joi.string().required(),
        SESSION_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: CHATBOT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('CHATBOT_HOST'),
            port: configService.get('CHATBOT_PORT'),
          },
        }),
        inject: [ConfigService],
      },
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
