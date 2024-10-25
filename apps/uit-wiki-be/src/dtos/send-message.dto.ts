import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  user_question: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  timestamp: number;
}
