import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pinecone } from '@pinecone-database/pinecone';
import { VectorQueryDto } from '../dtos/vector';

@Injectable()
export class PineconeService {
  private pineconeClient: Pinecone;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.pineconeClient = new Pinecone({
      apiKey: this.configService.get<string>('PINECONE_API_KEY'),
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
