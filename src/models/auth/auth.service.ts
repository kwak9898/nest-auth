import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // 비밀번호 유효성 검사
  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(userName);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
