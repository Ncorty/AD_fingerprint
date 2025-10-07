import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('scans')
export class Scan{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user:string;

    @Column()
    date:Date;

    @Column({default: false})
    isAD: boolean;
}
