
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Category  extends BaseEntity {
    @PrimaryGeneratedColumn()
    key:string

    //join in product-categories
    @OneToMany(()=>ProductCategory,productCategory=>productCategory.category)
    @JoinColumn()
    productCategories : ProductCategory[];
    //end join
}
