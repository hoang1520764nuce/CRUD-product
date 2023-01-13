import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FileEnum } from "../enums/file.enum";

@Entity( { name : 'file'})
export class File  extends BaseEntity{ 

    @PrimaryGeneratedColumn( { name : 'id'})
    id : string

    @Column( { name : 'key'})
    key : string

    @Column({nullable : true})
    url : string

    @Column({ type : 'enum'  , enum : FileEnum})
    type : FileEnum

    @Column( { name : 'size' , default : 0})
    size : number

    @Column( { name : 'uploaderId'})
    uploaderId : string
}