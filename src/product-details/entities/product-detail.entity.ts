import { BaseEntity } from "src/common/entities/base.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductDetailsLanguage } from "../enums/product-details.enum";

@Entity()
export class ProductDetail  extends BaseEntity {
    @PrimaryColumn({ name: 'product_id'})
    productId: string 

    @PrimaryColumn({type: 'enum', enum : ProductDetailsLanguage})
    lang:ProductDetailsLanguage
    
    @Column()
    name: string

    @Column()
    description: string

    @Column( {name: 'short_description'})
    shortDescription: string

    @Column()
    slug:string

   
    //join product
    @ManyToOne( ()=> Product , product=> product.productDetails) 
    @JoinColumn( { name :'product_id' })
    product: Product
    //end join
}
