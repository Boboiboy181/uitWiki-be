import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCacheDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  response: string;
}
