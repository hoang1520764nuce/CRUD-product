import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryDetail } from './category-detail.entity';
import { ProductCategory } from '../../Products/entities/product-category.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  key: number;

  //join in product-categories
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  @JoinColumn()
  categorieProducts: ProductCategory[];
  //end join

  //join in category-detail
  @OneToMany(() => CategoryDetail, (categoryDetail) => categoryDetail.category)
  @JoinColumn()
  categoryDetails: CategoryDetail[];
  //end join
}
