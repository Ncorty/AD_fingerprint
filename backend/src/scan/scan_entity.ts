import { StringLiteral } from '@babel/types';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('scans')
export class Scan{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user:string;

    @Column()
    date:Date;

    @Column()
    isAD: boolean;
}

