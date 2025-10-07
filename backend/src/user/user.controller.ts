import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entity/user_entity';

export type filters = {
  id: string;
  date: string;
};

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User, description: 'User created' })
  @Post()
  create(@Body() userDto: createUserDto) {
    return this.userService.createUser(userDto);
  }
}
