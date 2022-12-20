import { Module } from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { ProductDetailController } from './product_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductDetail])],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  exports:[TypeOrmModule]
})
export class ProductDetailModule {}
