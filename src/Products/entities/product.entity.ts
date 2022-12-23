import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "src/product_details/entities/product_detail.entity";
import { ProductCategory } from "src/product_categories/entities/product_category.entity";
import { ProductType, TaxStatus } from "../product.enumtype";


@Entity()
export class Product {

    
    @PrimaryGeneratedColumn()
    @OneToMany(type=>ProductDetail,productDetail=>productDetail.product_id)
    @OneToMany(type => ProductCategory, productCategory =>productCategory.product_id )
    @JoinColumn()
    id:ProductDetail|ProductCategory;

@Column()
type:ProductType;

@Column()
status:string

@Column({ default: true })  
is_featured:boolean

@Column()
tax_status:TaxStatus 

}