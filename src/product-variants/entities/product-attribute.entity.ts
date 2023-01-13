import { BaseEntity } from "src/common/entities/base.entity";
import { langEnum } from "src/common/enums/lang.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttributeDetail } from "./product-attribute-datail.entity";
import { ProductAttributeTerm } from "./product-attribute-term.entity";

@Entity( { name : 'product_attribute' })
export class ProductAttribute  extends BaseEntity{

    @PrimaryGeneratedColumn( { name : 'key'})
     key : string 
     
     @Column( { type : 'enum' , enum : ProductAttributeTerm }   )
     type : string | ProductAttributeTerm

     // join productAttributeTerm
        @OneToMany( () => ProductAttributeTerm , productAttributeTerm => productAttributeTerm.productAttribute)
        productAttributeTerms : ProductAttributeTerm[]
        
    // join productAttributeDetail
        @OneToMany( () => ProductAttributeDetail , productAttributeDetail => productAttributeDetail.productAttribute)
        productAttributeDetails : ProductAttributeDetail[]
}