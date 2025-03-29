import { IsNotEmpty, IsObject, IsString } from 'class-validator'

export class UpsertDocumentDto {
    @IsString()
    @IsNotEmpty()
    documentKey: string

    @IsString()
    @IsNotEmpty()
    parseType: string

    @IsObject()
    @IsNotEmpty()
    metadata: Record<string, any>
}
