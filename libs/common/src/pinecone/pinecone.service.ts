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
      const query = await index.namespace('bebetter').query({
        topK: 1000,
        includeValues: true,
        vector: Array(1024).fill(0),
        includeMetadata: true,
        filter: {
          documentId: filter.documentId,
        },
      });
      const listIds = query.matches.map((match) => match.id);

      if (listIds.length === 0) {
        return;
      }

      index.namespace('bebetter').deleteMany(listIds);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
