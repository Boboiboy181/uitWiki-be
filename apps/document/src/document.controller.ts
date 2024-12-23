import { CreateDocumentDto, UpdateDocumentDto } from '@app/common/dtos/document';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @MessagePattern('createDocument')
  create(createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @MessagePattern('findAllDocument')
  findAll() {
    return this.documentService.findAll();
  }

  @MessagePattern('findOneDocument')
  findOne(_id: string) {
    return this.documentService.findOne(_id);
  }
  @MessagePattern('updateDocument')
  update({ _id, updateDocumentDto }: { _id: string; updateDocumentDto: UpdateDocumentDto }) {
    return this.documentService.update(_id, updateDocumentDto);
  }

  @MessagePattern('removeDocument')
  remove(_id: string) {
    return this.documentService.remove(_id);
  }

  @MessagePattern('hardRemoveDocument')
  hardRemove(_id: string) {
    return this.documentService.hardRemove(_id);
  }
}
