import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsBoolean()
  isDeleted?: boolean;
}
