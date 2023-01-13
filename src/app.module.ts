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
import { addTransactionalDataSource } from 'typeorm-transactional';
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


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: '123123',
          database: 'product',
          entities: [
            Product,
            ProductDetail,
            Category,
            CategoryDetail,
            ProductCategory,
            
          ],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ProductModule,
    CategoryModule,
    ProductDetailsModule,  
  ],
})
export class AppModule {}
