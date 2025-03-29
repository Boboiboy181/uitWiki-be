import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsObject, IsString, IsUrl } from 'class-validator'

export class CreateDocumentDto {
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    documentUrl: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    parseType: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    documentKey: string

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    metadata: Record<string, any>
}
