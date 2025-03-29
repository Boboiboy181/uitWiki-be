import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCacheDto {
    @IsString()
    @IsNotEmpty()
    question: string

    @IsString()
    @IsNotEmpty()
    response: string
}
