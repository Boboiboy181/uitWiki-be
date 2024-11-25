import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UpsertDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentKey: string;

  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, any>;
}
