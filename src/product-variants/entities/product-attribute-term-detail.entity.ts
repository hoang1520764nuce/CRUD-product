import { BaseEntity } from "src/common/entities/base.entity";
import { langEnum } from "src/common/enums/lang.enum";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity( { name : 'product_attribute_term_detail'})
export class ProductAttributeTermDetail  extends BaseEntity{
    @PrimaryColumn( { name : 'product_attribute_term_id'})
    productAttributeTermId : string

    @PrimaryColumn( { type : 'enum' , enum : langEnum})
    lang : langEnum

    @Column( { name : 'value'})
    value : number
}