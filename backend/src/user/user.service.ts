import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user_entity';
import { createUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: createUserDto) {
    const user = await this.userRepository.find({
      where: {
        login: dto.login,
      },
    });
    if (!user) {
      const new_user = this.userRepository.create(dto);
      await this.userRepository.save(new_user);
      return new_user;
    } else {
      return user;
    }
  }
}
