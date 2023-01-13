import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttributeTerm } from "./product-attribute-term.entity";
import { ProductVariant } from "./product-variant.entity";

@Entity( { name : 'product_to_attribute' })
export class ProductToAttribute extends BaseEntity {

    @PrimaryGeneratedColumn( { name : 'id'})
    id : string

    @Column( { name : 'product_variant_id'})
    productVariantId : string

    @Column( { name : 'product_attribute_term_id'})
    productAttributeTermId : string

    //join productAttributeTerm
    @ManyToOne( () => ProductAttributeTerm , productAttributeTerm => productAttributeTerm.productToAttributes)
    productAttributeTerm : ProductAttributeTerm

    // join productVariant
    @ManyToOne( () => ProductVariant , productVariant => productVariant.productToVariants)
    productVariant : ProductVariant
    // end join
    

}