import { DatabaseModule, LoggerModule } from '@app/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { SessionDocument, SessionSchema } from './models/session.schema'
import { SessionController } from './session.controller'
import { SessionRepository } from './session.repository'
import { SessionService } from './session.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/session/.env',
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                SESSION_PORT: Joi.number().required(),
            }),
        }),
        LoggerModule,
        DatabaseModule,
        DatabaseModule.forFeature([{ name: SessionDocument.name, schema: SessionSchema }]),
    ],
    controllers: [SessionController],
    providers: [SessionService, SessionRepository],
})
export class SessionModule {}
