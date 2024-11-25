import { IsNotEmpty, IsObject, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @IsUrl()
  @IsNotEmpty()
  documentUrl: string;

  @IsString()
  @IsNotEmpty()
  documentKey: string;

  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, any>;
}
