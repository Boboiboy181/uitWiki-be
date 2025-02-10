import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  timestamp: number;
}
