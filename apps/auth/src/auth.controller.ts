import { CurrentUser } from '@app/common'
import { Controller, Post, UseGuards } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { UserDocument } from './users/models/users.schema'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['username', 'password'],
        },
    })
    @Post('login')
    async login(@CurrentUser() user: UserDocument) {
        const token = await this.authService.login(user)
        return {
            user: user,
            token: token,
        }
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern({ cmd: 'authenticate' })
    async authenticate(@Payload() data: any) {
        return data.user
    }
}
