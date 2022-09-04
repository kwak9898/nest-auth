import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from '../../guards/auth/localAuth.guard';
import { JwtAuthGuard } from '../../guards/auth/jwtAuth.guard';
import { Public } from '../../decorators/skipAuth.decorator';
import { User } from '../../database/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    // 쿠키 저장을 위한 res 생성
    const { token, ...option } = await this.authService.login(req.user);
    res.cookie('Authentication', token, option);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const { token, ...option } = await this.authService.logout();
    res.cookie('Authentication', token, option);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
