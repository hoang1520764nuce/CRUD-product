/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductModule } from './products/product.module';
import { ProductDetail } from './product_details/entities/product_detail.entity';
import { ProductDetailModule } from './product_details/product_detail.module';
import { CategoryModule } from './categories/category.module';
import { CategoryDetailModule } from './category_details/category_detail.module';
import { ProductCategoryModule } from './product_categories/product_category.module';
import { ProductCategory } from './product_categories/entities/product_category.entity';
import { Category } from './categories/entities/category.entity';
import { CategoryDetail } from './category_details/entities/category_detail.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port : 5433 ,
      username : 'postgres',
      password : '123123' ,
      database : 'product',
      entities:[Product,ProductDetail,ProductCategory,Category,CategoryDetail],
      autoLoadEntities:true,
      synchronize:true,   
    }),
    ProductModule,
    ProductDetailModule, 
    CategoryModule,   
    CategoryDetailModule, 
    ProductCategoryModule,
    ],

})
export class AppModule {



}
