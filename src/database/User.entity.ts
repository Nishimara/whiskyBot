import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    amount!: number

    @Column()
    lastTimeDrank!: number
}