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
import { ProductCategory } from './categories/entities/product-category.entity';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductVariant } from './product-variants/entities/product-variant.entity';
import { ProductToVariant } from './product-variants/entities/product-to-variant.entity';



@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      {
        useFactory(){
          return {
            type: 'postgres',
            host:'localhost',
            port : 5433 ,
            username : 'postgres',
            password : '123123' ,
            database : 'product',
            entities:[Product,ProductDetail,Category,CategoryDetail,ProductCategory,ProductVariant,ProductToVariant ],
            autoLoadEntities:true,
            synchronize:true,   
          };
        },
        async dataSourceFactory(options) {
          if (!options) {
            throw new Error('Invalid options passed');
          }

          return addTransactionalDataSource(new DataSource(options));
        },
      }
    ),
    ProductModule, CategoryModule, ProductDetailsModule, ProductVariantsModule
    ],

})
export class AppModule {



}
