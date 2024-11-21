import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './document.repository';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async create(createDocumentDto: CreateDocumentDto) {
    return await this.documentRepository.create(createDocumentDto);
  }

  async findAll() {
    return await this.documentRepository.findAll({
      isDeleted: false,
    });
  }

  async findOne(_id: string) {
    return await this.documentRepository.findOne({ _id });
  }

  async update(_id: string, updateDocumentDto: UpdateDocumentDto) {
    return await this.documentRepository.findOneAndUpdate({ _id }, updateDocumentDto);
  }

  async remove(_id: string) {
    return await this.documentRepository.findOneAndUpdate({ _id }, { isDeleted: true });
  }
}
