import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
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
  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @PrimaryColumn({ name: 'category_key' })
  categoryKey: string;

  // join product
  @ManyToOne(() => Product, (product) => product.productCategories)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  //endjoin

  // join category
  @ManyToOne(() => Category, (category) => category.productCategories)
  @JoinColumn({ name: 'category_key' })
  category: Category;
  //endjoin
}
