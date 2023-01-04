import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "src/product_details/entities/product_detail.entity";
import { ProductCategory } from "src/product_categories/entities/product_category.entity";
import { ProductStatus, ProductType, ProductTaxStatus } from "../enums/product.enumtype";



@Entity()
export class Product {

    
    @PrimaryGeneratedColumn()
    @OneToMany(()=>ProductDetail,productDetail=>productDetail.product)
    @OneToMany(() => ProductCategory, productCategory =>productCategory.product_id )
    @JoinColumn()
    id:string;

    productDetail : ProductDetail[];
    productCategory : ProductCategory[];

@Column({ type : 'enum', enum: ProductType })
type:ProductType;

@Column({ type :'enum', enum: ProductStatus})
status:ProductStatus

@Column({ default: true, name :'is_featured' })  
isfeatured:boolean

@Column({ type : 'enum' , enum: ProductTaxStatus, name: 'tax_status'})
taxStatus:ProductTaxStatus 

@DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}