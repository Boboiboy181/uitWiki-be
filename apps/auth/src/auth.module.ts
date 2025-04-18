import { HealthModule, LoggerModule } from '@app/common'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import * as Joi from 'joi'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        LoggerModule,
        UsersModule,
        HealthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/auth/.env',
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.number().required(),
                AUTH_PORT: Joi.number().required(),
                HTTP_PORT: Joi.number().required(),
            }),
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
