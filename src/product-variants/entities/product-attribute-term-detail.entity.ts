import { BaseEntity } from "src/common/entities/base.entity";
import { langEnum } from "src/common/enums/lang.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductAttributeTerm } from "./product-attribute-term.entity";

@Entity()
export class ProductAttributeTermDetail  extends BaseEntity{
    @PrimaryColumn( { name : 'product_attribute_term_id'})
    productAttributeTermId : number

    @PrimaryColumn( { type : 'enum' , enum : langEnum})
    lang : langEnum

    @Column( { name : 'value'})
    value : number

    //join productAttributeTerm
    @ManyToOne( () => ProductAttributeTerm , productAttributeTerm => productAttributeTerm.productAttributeTermDetails)
    @JoinColumn(    { name : 'product_attribute_term_id' }  )
    productAttributeTerm : ProductAttributeTerm

}