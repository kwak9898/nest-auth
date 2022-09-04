import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../models/users/users.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authenticator;
        },
      ]), // JWT 추출 방법을 제공 (Request의 Authorization 헤더에 토큰을 제공하는 방식.)
      ignoreExpiration: false, // false면 JWT가 만료되었는지 확인 후 만료 시 401 예외를 발생.
      secretOrKey: configService.get('JWT_SECRET'), // 다칭키를 제공하는 옵션
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
