import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/uit-wiki-be/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_PREFIX_NAME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
