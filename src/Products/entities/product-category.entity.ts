import { BaseEntity } from 'src/common/entities/base.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
@Entity()
export class ProductCategory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id : string

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'category_key' })
  categoryKey: string;

  // join product
  @ManyToOne(() => Product, (product) => product.productCategories)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  //endjoin

  // join category
  @ManyToOne(() => Category, (category) => category.categorieProducts)
  @JoinColumn({ name: 'category_key' })
  category: Category;
  //endjoin
}
