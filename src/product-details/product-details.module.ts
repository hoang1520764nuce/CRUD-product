import { Module } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { ProductDetailsController } from './product-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
  imports:[TypeOrmModule.forFeature([ProductDetail,Product])],
  exports:[TypeOrmModule,ProductDetailsService]
})
export class ProductDetailsModule {}
