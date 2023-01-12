import { BaseEntity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column, PrimaryColumn, Entity, ManyToOne } from "typeorm";
import { langCategoryDetailEnum } from "../enums/category-detail.enum";
import { Category } from "./category.entity";
@Entity()
export class CategoryDetail extends BaseEntity {

  @PrimaryColumn({name : 'category_key'})
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
  @ManyToOne(() => Category, category => category.categoryDetails)
  @JoinColumn( { name :'category_key' } )
  category: Category ;
  //end join

  

}