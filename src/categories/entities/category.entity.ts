//import { CategoryDetail } from "src/category_details/entities/category_detail.entity";
//import { ProductCategory } from "src/product_categories/entities/product_category.entity";
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    //  @OneToMany(type => ProductCategory, productCategory => productCategory.catagory_key)
    // @OneToMany(type => CategoryDetail, categoryDetail => categoryDetail.category_key)
    //  @JoinColumn()
    @PrimaryGeneratedColumn()
    key:string
}
