import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user_entity';
import { createUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async createUser(dto: createUserDto)
    {
        const user = await this.userRepository.create(dto);
        await this.userRepository.save(user);
        return user;
    }

    async getAllUsers()
    {
        const users = await this.userRepository.find();
        return users
    }
}
