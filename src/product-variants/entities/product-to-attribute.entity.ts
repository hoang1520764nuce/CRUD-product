import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttributeTerm } from "./product-attribute-term.entity";
import { ProductVariant } from "./product-variant.entity";

@Entity()
export class ProductToAttribute extends BaseEntity {

    @PrimaryGeneratedColumn( { name : 'id'})
    id : number

    @Column( { name : 'product_variant_id'})
    productVariantId : number

    @Column( { name : 'product_attribute_term_id'})
    productAttributeTermId : number

    //join productAttributeTerm
    @ManyToOne( () => ProductAttributeTerm , productAttributeTerm => productAttributeTerm.productToAttributes)
    @JoinColumn( { name : 'product_attribute_term_id'})
    productAttributeTerm : ProductAttributeTerm

    // join productVariant
    @ManyToOne( () => ProductVariant , productVariant => productVariant.productToVariants)
    @JoinColumn( { name : 'product_variant_id'})
    productVariant : ProductVariant
    // end join
    

}