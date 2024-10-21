import { CHATBOT_SERVICE, ConfigModule, DatabaseModule, LoggerModule, SESSION_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: CHATBOT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
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
            host: '0.0.0.0',
            port: configService.get('SESSION_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
