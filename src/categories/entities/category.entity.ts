
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryDetail } from './category-detail.entity';
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

    //join in category-detail
    @OneToMany( () => CategoryDetail, categoryDetail => categoryDetail.category)
    @JoinColumn()
    categoryDetails : CategoryDetail[];
    //end join
}
