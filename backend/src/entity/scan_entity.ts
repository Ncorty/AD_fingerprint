import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('scans')
export class Scan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column({ default: false })
  isAD: boolean;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
