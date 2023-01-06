/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductModule } from './products/product.module';

import { CategoryModule } from './categories/category.module';

import { Category } from './categories/entities/category.entity';

import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductDetail } from './product-details/entities/product-detail.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port : 5433 ,
      username : 'postgres',
      password : '123123' ,
      database : 'product',
      entities:[Product,ProductDetail,Category],
      autoLoadEntities:true,
      synchronize:true,   
    }),
    ProductModule,
   
    CategoryModule,   
     ProductDetailsModule
    ],

})
export class AppModule {



}
