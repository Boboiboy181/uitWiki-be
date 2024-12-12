import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/token-payload.type';
import { UserDocument } from './users/models/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    // eslint-disable-next-line prettier/prettier
  ) {}

  async login(user: UserDocument) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'));

    const token = this.jwtService.sign(tokenPayload);

    return token;
  }
}
