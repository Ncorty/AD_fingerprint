import { ApiProperty } from '@nestjs/swagger';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

interface userCreate{
    login:string;
}


@Entity('users')
export class User{
    @ApiProperty({ example: 1, description: 'Unique identifier' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'test', description: 'User login' })
    @Column()
    login: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}