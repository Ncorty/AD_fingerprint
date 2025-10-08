import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 'test', description: 'User login' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @CreateDateColumn()
  createdAt: Date;
}
