import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "src/product-details/entities/product-detail.entity";
//import { ProductCategory } from "src/product-categories/entities/product-category.entity";
import { ProductStatus, ProductType, ProductTaxStatus } from "../enums/product.enumtype";
import { BaseEntity } from "src/common/entities/base.entity";



@Entity()
export class Product extends BaseEntity   {

  // @OneToMany(() => ProductCategory, productCategory =>productCategory.product_id )
  // productCategory : ProductCategory[];
    
    @PrimaryGeneratedColumn()
    id:string;
    
    //join product-details
    @OneToMany(()=>ProductDetail,productDetail=>productDetail.product)
    @JoinColumn()
    productDetails : ProductDetail[];
    //end join

@Column({ type : 'enum', enum: ProductType })
type:ProductType;

@Column({ type :'enum', enum: ProductStatus})
status:ProductStatus

@Column({ default: true, name :'is_featured' })  
isFeatured:boolean

@Column({ type : 'enum' , enum: ProductTaxStatus, name: 'tax_status'})
taxStatus:ProductTaxStatus 


}