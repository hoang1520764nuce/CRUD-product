import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string

@Column()
phone:string

@Column()
address:string

@Column()
salary:number
}