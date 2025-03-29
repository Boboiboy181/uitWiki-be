import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dtos/create-user.dto'
import { GetUserDto } from './dtos/get-user.dto'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    private async validateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email })
        } catch (_error) {
            return
        }

        throw new UnprocessableEntityException('User already exists')
    }

    async create(createUserDto: CreateUserDto) {
        await this.validateUserDto(createUserDto)

        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        })
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email })
        const passwordIsValid = await bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid')
        }

        return user
    }

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto)
    }
}
