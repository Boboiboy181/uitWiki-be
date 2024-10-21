import { ConfigModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
