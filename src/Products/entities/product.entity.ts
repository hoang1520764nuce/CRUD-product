import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetail } from 'src/product-details/entities/product-detail.entity';
//import { ProductCategory } from "src/product-categories/entities/product-category.entity";
import {
  ProductStatus,
  ProductType,
  ProductTaxStatus,
} from '../enums/product.enumtype';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProductCategory } from 'src/Products/entities/product-category.entity';
import { ProductToVariant } from 'src/product-variants/entities/product-to-variant.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  // @OneToMany(() => ProductCategory, productCategory =>productCategory.product_id )
  // productCategory : ProductCategory[];

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @Column({ type: 'enum', enum: ProductStatus })
  status: ProductStatus;

  @Column({ default: true, name: 'is_featured' })
  isFeatured: boolean;

  @Column({ type: 'enum', enum: ProductTaxStatus, name: 'tax_status' })
  taxStatus: ProductTaxStatus;

  //join product-details
  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  @JoinColumn()
  productDetails: ProductDetail[];
  //end join

  //join product-categories
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  @JoinColumn()
  productCategories: ProductCategory[];
  //end join

  // join productToVariant
  @OneToMany(
    () => ProductToVariant,
    (productToVariant) => productToVariant.product,
  )
  @JoinColumn()
  productToVariants: ProductToVariant[];
  // end join
}
