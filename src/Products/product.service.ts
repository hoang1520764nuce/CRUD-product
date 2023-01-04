import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPagenationDto } from './dto/product-pagenation.dto';
import { updateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class productService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(CreateProductDto: CreateProductDto) {
    const product = await this.productRepository.save(CreateProductDto);
    return this.productRepository.findOne({
      where: { id: product.id },
    });
  }

  async updateProduct(id: string, updateProductDto: updateProductDto) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else await this.productRepository.update({ id }, updateProductDto);
    product.type = updateProductDto.type;
    product.status = updateProductDto.status;
    product.isfeatured = updateProductDto.isFeatured;
    product.taxStatus = updateProductDto.taxStatus;

    return product;
  }

  async softDeleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else await this.productRepository.softDelete(id);
  }

  async findAll(dto :ProductPagenationDto) {
   
    const page = dto.page;
    const limit = dto.limit;
    const productQueryBuilder = await this.productRepository.createQueryBuilder('product');
   
    return paginate(productQueryBuilder, { limit, page });
   
   
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else return product;
  }
}
