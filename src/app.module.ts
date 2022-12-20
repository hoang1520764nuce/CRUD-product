/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Products/entities/product.entity';
import { ProductModule } from './Products/product.module';
import { ProductDetail } from './product_detail/entities/product_detail.entity';
import { ProductDetailModule } from './product_detail/product_detail.module';
import { CategoryModule } from './category/category.module';
import { CategoryDetailModule } from './category_detail/category_detail.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { ProductCategory } from './product_category/entities/product_category.entity';
import { Category } from './category/entities/category.entity';
import { CategoryDetail } from './category_detail/entities/category_detail.entity';


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
