import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    IORedisModule.forRoot({
      type: 'single',
      url: 'redis://:2JvM71fSBlIeHKAw9CosSbPNewm8cfqz@redis-13826.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com:13826',
    }),
  ],
})
export class RedisModule {}
