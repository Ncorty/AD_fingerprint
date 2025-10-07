import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entity/user_entity';


@Controller('user')
export class UserController {

    constructor(private userService: UserService){}
    @ApiOperation({ summary: 'Create user' })   
    @ApiResponse({ status: 200,type: User ,description: 'User created' })
    @Post()
    create(@Body() userDto:createUserDto)
    {
        return this.userService.createUser(userDto)
    }
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User], description: 'List of users' })
    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }

}
