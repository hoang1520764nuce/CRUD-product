import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDetailDto } from './dtos/create-product-detail.dto';
import { ProductDetailPagenationDto } from './dtos/product-detail-pagenation.dto';
import { UpdateProductDetailDto } from './dtos/update-product-detail.dto';
import { ProductDetail } from './entities/product-detail.entity';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(ProductDetail)
    private productDetailRepo: Repository<ProductDetail>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDetailDto, productId: number) {
    const { lang, name, description, shortDescription, slug } = dto;
    const productDetail = this.productDetailRepo.create({
      productId,
      lang,
      name,
      description,
      shortDescription,
      slug,
    });
    await this.productDetailRepo.save(productDetail);
    return productDetail;
  }

  // async create(dto: CreateProductDetailDto) {
  //   const {  productId, lang, name, description, shortDescription, slug } = dto;
  //   const productDetail = this.productDetailRepo.create({
  //     productId,
  //     lang,
  //     name,
  //     description,
  //     shortDescription,
  //     slug,
  //   });
  //   await this.productDetailRepo.save(productDetail);
  //   return productDetail;
  // }

  async findAll(dto: ProductDetailPagenationDto) {
    const { page, limit } = dto;

    const productDetailQueryBuilder =
      this.productDetailRepo.createQueryBuilder('ProductDetail');

    return paginate(productDetailQueryBuilder, { page, limit });
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
