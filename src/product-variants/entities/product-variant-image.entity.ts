import { BaseEntityWithoutUpdateAndVersion } from "src/common/entities/base.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductVariant } from "./product-variant.entity";

@Entity( { name : 'product_variant_image'}) 

export class ProductVariantImage extends BaseEntityWithoutUpdateAndVersion { 
    
    @PrimaryColumn( { name : 'file_id'})
    imageId : string

    @PrimaryColumn( { name : 'product_variant_id'})
    productVariantId : string

    //join product_variant
    @ManyToOne( () => ProductVariant , productVariant => productVariant.productVariantImages)
    @JoinColumn( { name : 'product_variant_id'})
    productVariant : ProductVariant;
    //end join
}