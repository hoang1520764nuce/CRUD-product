import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEnum } from "../enums/file.enum";
import { ProductVariantImage } from "./product-variant-image.entity";

@Entity()
export class File  extends BaseEntity{ 

    @PrimaryGeneratedColumn( { name : 'id'})
    id : number

    @Column( { name : 'key'})
    key : number

    @Column({nullable : true})
    url : string

    @Column({ type : 'enum'  , enum : FileEnum})
    type : FileEnum

    @Column( { name : 'size' , default : 0})
    size : number

    @Column( { name : 'uploaderId'})
    uploaderId : number

    // join productVariantImage
    @OneToMany( type => ProductVariantImage , productVariantImage => productVariantImage.file)
    productVariantImages : ProductVariantImage[]
    
}