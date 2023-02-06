/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductModule } from './products/product.module';

import { CategoryModule } from './categories/category.module';

import { Category } from './categories/entities/category.entity';

import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductDetail } from './product-details/entities/product-detail.entity';

import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { CategoryDetail } from './categories/entities/category-detail.entity';
import { ProductCategory } from './Products/entities/product-category.entity';
import { ProductVariantsModule } from './product-variants/product-variants.module';

import { ProductToVariant } from './product-variants/entities/product-to-variant.entity';
import { ProductVariant } from './product-variants/entities/product-variant.entity';
import { ProductVariantImage } from './product-variants/entities/product-variant-image.entity';
import { File } from './product-variants/entities/file.entity';
import { ProductToAttribute } from './product-variants/entities/product-to-attribute.entity';
import { ProductAttributeDetail } from './product-variants/entities/product-attribute-datail.entity';
import { ProductAttributeTerm } from './product-variants/entities/product-attribute-term.entity';
import { ProductAttribute } from './product-variants/entities/product-attribute.entity';
import { ProductAttributeTermDetail } from './product-variants/entities/product-attribute-term-detail.entity';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/entities/cart.entity';
import { CartLineItem } from './carts/entities/cart-line-item.entity';
import dataSource, { dataSourceOptions } from 'data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductModule,
    CategoryModule,
    ProductDetailsModule,
    ProductVariantsModule,
    CartsModule,
  ],
})
export class AppModule {}
