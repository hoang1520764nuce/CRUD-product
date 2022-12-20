import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';

@Injectable()
export class ProductDetailService {
  create(createProductDetailDto: CreateProductDetailDto) {
    return 'This action adds a new productDetail';
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
