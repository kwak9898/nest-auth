import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 비밀번호 유효성 검사
  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(userName);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userName: user.userName, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
