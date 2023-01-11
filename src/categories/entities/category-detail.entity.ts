import { BaseEntity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column } from "typeorm";
import { langCategoryDetailEnum } from "../enums/category-detail.enum";
import { ProductCategory } from "./product-category.entity";

export class CategoryDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  lang: langCategoryDetailEnum;

  @Column()
  desc : string

  @Column()
  name : string

  @Column()
  slug : string

  //join in product-categories
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  @JoinColumn()
  productCategories: ProductCategory[];
  //end join
}