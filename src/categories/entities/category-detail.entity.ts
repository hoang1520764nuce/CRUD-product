import { BaseEntity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column, PrimaryColumn, Entity } from "typeorm";
import { langCategoryDetailEnum } from "../enums/category-detail.enum";
import { Category } from "./category.entity";
import { ProductCategory } from "./product-category.entity";
@Entity()
export class CategoryDetail extends BaseEntity {

  @Column({name : 'category_key'})
  categoryKey: string;

  @PrimaryColumn()
  lang: langCategoryDetailEnum;

  @Column()
  desc : string

  @Column()
  name : string

  @Column()
  slug : string

  //join in category
  @OneToMany(() => Category, (category) => category.categoryDetails)
  @JoinColumn()
  category: Category ;
  //end join

  

}