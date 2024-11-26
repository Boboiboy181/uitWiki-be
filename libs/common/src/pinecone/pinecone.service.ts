import { HttpException, Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { VectorQueryDto } from '../dtos/vector';

@Injectable()
export class PineconeService {
  private pineconeClient: Pinecone;

  async onModuleInit() {
    this.pineconeClient = new Pinecone({
      apiKey: 'd05ff847-fdcc-4592-9550-39116e977464',
    });
  }

  async queryVectors({ indexName, filter }: VectorQueryDto) {
    try {
      const index = this.pineconeClient.Index(indexName);
      const response = await index.deleteMany(filter);
      return response;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
