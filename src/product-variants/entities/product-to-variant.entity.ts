import { BaseEntity } from "src/common/entities/base.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariant } from "./product-variant.entity";

@Entity()
export class ProductToVariant  extends BaseEntity{
    @PrimaryColumn( { name : 'product_id'})
    productId : string

    @PrimaryColumn( { name : 'product_variant_id'})
    productVariantId : string
    
    //join productVariant
    @ManyToOne( () => ProductVariant , productVariant => productVariant.productToVariants)
    @JoinColumn( { name : 'product_variant_id' } )
    productVariant : ProductVariant
    // end join

    // join Product
    @ManyToOne( () => Product , product => product.productToVariants)
    @JoinColumn( { name : 'product_id' } )
    product : Product
    // end join
}
