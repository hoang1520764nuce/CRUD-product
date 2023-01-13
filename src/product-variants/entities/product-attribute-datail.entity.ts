import { BaseEntity } from "src/common/entities/base.entity";
import { langEnum } from "src/common/enums/lang.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductAttribute } from "./product-attribute.entity";

@Entity()
export class ProductAttributeDetail  extends BaseEntity{ 

    @PrimaryColumn( { name : 'product_attribute_key'})
    productAttributeKey : string

    @Column( { type : 'enum' , enum : langEnum } )
    lang : langEnum

    @Column( { name : 'name'})
    name : string

    @Column( { name : 'slug'})
    slug : string

    @Column( { name : 'description'})
    description : string

    // join productAttribute
    @ManyToOne( () => ProductAttribute , productAttribute => productAttribute.productAttributeDetails)
    @JoinColumn(    { name : 'product_attribute_key' }  )
    productAttribute : ProductAttribute
    
    
}