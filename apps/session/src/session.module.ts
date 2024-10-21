import { ConfigModule, DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { SessionDocument, SessionSchema } from './models/session.schema';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: SessionDocument.name, schema: SessionSchema }]),
  ],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
})
export class SessionModule {}
