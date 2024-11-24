import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @IsBoolean()
  isActive?: boolean;

  @IsBoolean()
  isDeleted?: boolean;
}
