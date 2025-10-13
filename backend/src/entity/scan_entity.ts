import { ApiProperty} from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('scans')
export class Scan {
  @ApiProperty({ example: 1, description: 'Scan ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'scan', description: 'User login' })
  @Column()
  user: string;

  @ApiProperty({ example: false, description: 'Is AntiDetect browser' })
  @Column({ default: false })
  isAD: boolean;

  @ApiProperty({ example: 'This is a comment', description: 'Scan comment' })
  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
