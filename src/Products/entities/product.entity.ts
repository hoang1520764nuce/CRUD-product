import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetail } from "src/product_detail/entities/product_detail.entity";
import { ProductCategory } from "src/product_category/entities/product_category.entity";


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    @OneToMany(type=>ProductDetail,productDetail=>productDetail.product_id)
    @OneToMany(type => ProductCategory, productCategory =>productCategory.product_id )
    @JoinColumn()
    id:ProductDetail|ProductCategory;

@Column()
type:string;

@Column()
status:string

@Column({ default: true })  
is_featured:boolean

@Column({ default: true })
tax_status:boolean 

}