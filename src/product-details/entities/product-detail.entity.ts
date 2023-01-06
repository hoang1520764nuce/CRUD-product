import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductDetailsLanguage } from "../enums/product-details.enum";

@Entity()
export class ProductDetail {
    @PrimaryColumn({ name: 'product_id'})
    productId: string 

    @Column({type: 'enum', enum : ProductDetailsLanguage})
    lang:ProductDetailsLanguage
    
    @Column()
    name: string

    @Column()
    description: string

    @Column( {name: 'short_description'})
    shortDescription: string

    @Column()
    slug:string

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;

    //join product
    @ManyToOne( ()=> Product , product=> product.productDetail) 
    @JoinColumn( { name :'product_id' })
    product: Product
    //end join
}
