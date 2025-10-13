import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'test', description: 'User login' })
  @Column()
  login: string;

  @CreateDateColumn()
  createdAt: Date;
}
