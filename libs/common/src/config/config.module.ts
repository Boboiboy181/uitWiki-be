import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        CHATBOT_HOST: Joi.string().required(),
        CHATBOT_PORT: Joi.number().required(),
        CHATBOT_API_URL: Joi.string().required(),
        SESSION_HOST: Joi.string().required(),
        SESSION_PORT: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
