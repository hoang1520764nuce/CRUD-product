import { BaseEntity } from "src/common/entities/base.entity";
import { langEnum } from "src/common/enums/lang.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { typeProductAttribute } from "../enums/product-attribute-type.enum";
import { ProductAttributeDetail } from "./product-attribute-datail.entity";
import { ProductAttributeTerm } from "./product-attribute-term.entity";


@Entity()
export class ProductAttribute  extends BaseEntity{

    @PrimaryGeneratedColumn( { name : 'key'})
     key : number 
     
     @Column( { type : 'enum' , enum : typeProductAttribute })
     type : string | typeProductAttribute

     // join productAttributeTerm
        @OneToMany( () => ProductAttributeTerm , productAttributeTerm => productAttributeTerm.productAttribute)
        productAttributeTerms : ProductAttributeTerm[]
        
    // join productAttributeDetail
        @OneToMany( () => ProductAttributeDetail , productAttributeDetail => productAttributeDetail.productAttribute)
        productAttributeDetails : ProductAttributeDetail[]
}