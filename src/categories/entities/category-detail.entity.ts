import {  JoinColumn, Column, PrimaryColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { langCategoryDetailEnum } from "../enums/category-detail.enum";
import { Category } from "./category.entity";
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class CategoryDetail extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name : 'category_key'})
  categoryKey: number;

  @Column()
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