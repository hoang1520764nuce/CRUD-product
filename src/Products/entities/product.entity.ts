import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "src/product_details/entities/product_detail.entity";
import { ProductCategory } from "src/product_categories/entities/product_category.entity";
import { ProductStatus, ProductType, TaxStatus } from "../enums/product.enumtype";



@Entity()
export class Product {

    
    @PrimaryGeneratedColumn()
    @OneToMany(type=>ProductDetail,productDetail=>productDetail.product_id)
    @OneToMany(type => ProductCategory, productCategory =>productCategory.product_id )
    @JoinColumn()
    id:string;

    productDetail : ProductDetail[];
    productCategory : ProductCategory[];

@Column({type : 'enum' , enum: ProductType })
type:ProductType;

@Column( {type :'enum' , enum: ProductStatus})
status:ProductStatus

@Column({ default: true })  
is_featured:boolean

@Column({type : 'enum' , enum: TaxStatus})
tax_status:TaxStatus 

@DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}