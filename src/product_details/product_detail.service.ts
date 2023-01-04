import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ProductDetail } from './entities/product_detail.entity';

@Injectable()
export class ProductDetailService {

  constructor 
   (
     @InjectRepository(ProductDetail) 
   private productDetailRepository: Repository<ProductDetail>,
   )
   {}

  
  async create(createProductDetailDto: CreateProductDetailDto) {
    const productDetail = await this.productDetailRepository.save(createProductDetailDto);
    return this.productDetailRepository.findOne({
      where: { product_id: productDetail.product_id },
    });

  }

  findAll() {
    return `This action returns all productDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productDetail`;
  }

  update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    return `This action updates a #${id} productDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDetail`;
  }
}
