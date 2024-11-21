import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, any>;
}
