import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UploadService {
    private readonly s3Client: S3Client

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        })
    }

    async uploadFile(file: Express.Multer.File): Promise<{ documentUrl: string; documentKey: string }> {
        const bucketName = this.configService.get('AWS_BUCKET_NAME')
        const fileKey = `${this.configService.get('AWS_PREFIX_NAME')}/${file.originalname}`

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        })

        await this.s3Client.send(command)

        return {
            documentUrl: `https://${bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileKey}`,
            documentKey: fileKey,
        }
    }
}
