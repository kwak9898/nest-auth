import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // 비밀번호 유효성 검사
  async validateUser(email: string, plainTextPassword: string): Promise<any> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      const { password, ...result } = user;

      return user;
    } catch (err) {
      throw new HttpException('잘못된 인증입니다.', HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    };
  }

  async logout() {
    return {
      token: '',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }

  async register(user: User) {
    const hashedPassword = await hash(user.password, 12);
    try {
      const { password, ...returnUser } = await this.usersService.createUser({
        ...user,
        password: hashedPassword,
      });

      return returnUser;
    } catch (err) {
      if (err?.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          '이미 존재하는 이메일입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatch) {
      throw new HttpException('잘못된 인증입니다.', HttpStatus.BAD_REQUEST);
    }
  }
}
