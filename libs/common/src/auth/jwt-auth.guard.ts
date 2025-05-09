import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClientProxy } from '@nestjs/microservices'
import { Request } from 'express'
import { Observable, catchError, map, of, tap } from 'rxjs'
import { AUTH_SERVICE } from '../constants'
import { UserDto } from '../dtos'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly logger = new Logger(JwtAuthGuard.name)

    constructor(
        @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        // const jwt = request.cookies?.Authentication;
        const token = this.extractTokenFromHeader(request)

        const roles =
            this.reflector.get<string[]>('roles', context.getHandler()) ||
            this.reflector.get<string[]>('roles', context.getClass())

        return this.authClient.send<UserDto>({ cmd: 'authenticate' }, { Authentication: token }).pipe(
            tap((res) => {
                if (roles) {
                    for (const role of roles) {
                        if (!res.roles.includes(role)) {
                            this.logger.error(`User does not have the required role: ${role}`)
                            throw new UnauthorizedException()
                        }
                    }
                }
                context.switchToHttp().getRequest().user = res
            }),
            map(() => true),
            catchError((err) => {
                this.logger.error(err)
                return of(false)
            }),
        )
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
