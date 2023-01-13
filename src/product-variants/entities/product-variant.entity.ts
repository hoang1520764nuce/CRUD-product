import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductToVariant } from "./product-to-variant.entity";

@Entity()
export class ProductVariant  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : string

    @Column()
    price : number

    @Column()
    sku : string

    @Column()
    quantity : number

    @Column( {name : 'sale_price'})
    salePrice : number

    @Column( {name : 'on_sale'})
    onSale : boolean 

    //join productToVariant
    @OneToMany( () => ProductToVariant , productToVariant => productToVariant.productVariant)
    @JoinColumn()
    productToVariants : ProductToVariant[];
    // end join
}
