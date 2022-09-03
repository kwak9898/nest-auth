import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { Public } from '../../decorators/skipAuth.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param() id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post()
  async createUser(@Body() user: User): Promise<void> {
    return this.usersService.createUser(user);
  }
}
