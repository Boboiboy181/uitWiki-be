import { CreateDocumentDto, UpdateDocumentDto } from '@app/common/dtos/document';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  private documentClient = this.documentService.getClient();

  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentClient.send('createDocument', createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentClient.send('findAllDocument', {});
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.documentClient.send('findOneDocument', _id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentClient.send('updateDocument', { _id: id, updateDocumentDto });
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.documentClient.send('removeDocument', _id);
  }
}
