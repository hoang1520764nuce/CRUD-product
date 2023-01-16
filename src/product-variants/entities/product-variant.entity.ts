import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductToAttribute } from "./product-to-attribute.entity";
import { ProductToVariant } from "./product-to-variant.entity";
import { ProductVariantImage } from "./product-variant-image.entity";

@Entity()
export class ProductVariant  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

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

    // join productVariantImage
    @OneToMany( () => ProductVariantImage , productVariantImage => productVariantImage.productVariant)
    @JoinColumn()
    productVariantImages : ProductVariantImage[];
    // end join

    //join productToAttribute
    @OneToMany( () => ProductToAttribute , productToAttribute => productToAttribute.productVariant)
    @JoinColumn()
    productToAttributes : ProductToAttribute[];
}
