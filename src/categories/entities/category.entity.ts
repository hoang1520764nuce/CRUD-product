
import { CategoryDetail } from "src/category_detail/entities/category_detail.entity";
import { ProductCategory } from "src/product_category/entities/product_category.entity";
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    @OneToMany(type => ProductCategory, productCategory => productCategory.catagory_key)
    @OneToMany(type => CategoryDetail, categoryDetail => categoryDetail.category_key)
    @JoinColumn()
    key:ProductCategory|CategoryDetail
}
