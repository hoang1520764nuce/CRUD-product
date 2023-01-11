import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

export class ProductCategory extends BaseEntity {
    @Column({ name : 'product_id'})
    ProductId:string

    @Column({ name : 'category_key'})
    CategoryKey:string

    // join product
    @ManyToOne( ()=> Product , product=> product.productCategories)
    product: Product
    //endjoin

    // join category
    @ManyToOne( ()=> Category , category=> category.productCategories)
    category: Category
    //endjoin
}

