import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "src/product-details/entities/product-detail.entity";
//import { ProductCategory } from "src/product-categories/entities/product-category.entity";
import { ProductStatus, ProductType, ProductTaxStatus } from "../enums/product.enumtype";



@Entity()
export class Product   {

  // @OneToMany(() => ProductCategory, productCategory =>productCategory.product_id )
  // productCategory : ProductCategory[];
    
    @PrimaryGeneratedColumn()
    id:string;
    
    //join product-details
    @OneToMany(()=>ProductDetail,productDetail=>productDetail.product)
    @JoinColumn()
    productDetail : ProductDetail[];
    //end join

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