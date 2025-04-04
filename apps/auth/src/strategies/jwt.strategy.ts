import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TokenPayload } from '../types/token-payload.type'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    console.log(request)
                    return request?.cookies?.Authentication || request?.Authentication
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate({ userId }: TokenPayload) {
        return this.usersService.getUser({ _id: userId })
    }
}
