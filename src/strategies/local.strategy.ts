import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../models/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // 인증 전략 구현
  async validate(userName: string, password: string): Promise<any> {
    const user = this.authService.validateUser(userName, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
