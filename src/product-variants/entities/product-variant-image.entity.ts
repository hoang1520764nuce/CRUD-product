import { BaseEntityWithoutUpdateAndVersion } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariant } from "./product-variant.entity";
import { File } from "./file.entity";
@Entity()

export class ProductVariantImage extends BaseEntityWithoutUpdateAndVersion { 
    
    @PrimaryGeneratedColumn()
    id : number

    @Column( { name : 'file_id'})
    imageId : number

    @Column( { name : 'product_variant_id'})
    productVariantId : number

    //join product_variant
    @ManyToOne( () => ProductVariant , productVariant => productVariant.productVariantImages)
    @JoinColumn( { name : 'product_variant_id'})
    productVariant : ProductVariant;
    //end join

    //join File
    @ManyToOne( () => File , file => file.productVariantImages)
    @JoinColumn( { name : 'file_id'})
    file : File;
}