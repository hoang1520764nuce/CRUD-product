import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttribute } from "./product-attribute.entity";
import { ProductToAttribute } from "./product-to-attribute.entity";

Entity( { name : 'product_attribute_term'})
export class ProductAttributeTerm  extends BaseEntity{

    @PrimaryGeneratedColumn( { name : 'id'})
    id : string

    @Column( { name : 'product_attribute_key'})
    productAttributeKey : string

    //join  productToAttribute
    @OneToMany( () => ProductToAttribute , productToAttribute => productToAttribute.productAttributeTerm)
    productToAttributes : ProductToAttribute[]

    // join productAttribute
    @ManyToOne( () => ProductAttribute , productAttribute => productAttribute.productAttributeTerms)
    productAttribute : ProductAttribute

    

   
}