import { DOCUMENT_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DocumentService {
  constructor(@Inject(DOCUMENT_SERVICE) private readonly documentService: ClientProxy) {}

  getClient(): ClientProxy {
    return this.documentService;
  }
}
