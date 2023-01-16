import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttributeTermDetail } from "./product-attribute-term-detail.entity";
import { ProductAttribute } from "./product-attribute.entity";
import { ProductToAttribute } from "./product-to-attribute.entity";

@Entity()
export class ProductAttributeTerm  extends BaseEntity{

    @PrimaryGeneratedColumn( { name : 'id'})
    id : number

    @Column( { name : 'product_attribute_key'})
    productAttributeKey : number

    //join  productToAttribute
    @OneToMany( () => ProductToAttribute , productToAttribute => productToAttribute.productAttributeTerm)
    productToAttributes : ProductToAttribute[]

    // join productAttribute
    @ManyToOne( () => ProductAttribute , productAttribute => productAttribute.productAttributeTerms)
    @JoinColumn(    { name : 'product_attribute_key' }  )
    productAttribute : ProductAttribute

    // join productAttributeTermDetail
    @OneToMany( () => ProductAttributeTermDetail , productAttributeTermDetail => productAttributeTermDetail.productAttributeTerm)
    productAttributeTermDetails : ProductAttributeTermDetail[]


   
}