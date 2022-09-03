import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppController } from '../../app.controller';

@Module({
  controllers: [AppController],
  providers: [AuthService],
})
export class AuthModule {}
