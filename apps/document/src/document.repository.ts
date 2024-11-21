import { AbstractRepository } from '@app/common';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './models/document.schema';

export class DocumentRepository extends AbstractRepository<Document> {
  protected readonly logger = new Logger(DocumentRepository.name);

  constructor(
    @InjectModel(Document.name)
    reservationModel: Model<Document>,
  ) {
    super(reservationModel);
  }
}
