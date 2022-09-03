import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 모든 유저 찾기
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 특정 유저 찾기
  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 유저 삭제
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // 유저 생성
  async createUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  // 특정 사용자 이름 찾기
  async findByUserName(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { userName } });
  }
}
