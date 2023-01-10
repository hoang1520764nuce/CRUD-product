import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductDetail } from 'src/product-details/entities/product-detail.entity';
import { Transactional } from 'typeorm-transactional';
import { Repository, TransactionAlreadyStartedError } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductPagenationDto } from './dto/product-pagenation.dto';
import { updateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDetailDto } from 'src/product-details/dto/update-product-detail.dto';

@Injectable()
export class productService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
  ) {}

  // using transaction
  @Transactional()
  async createProduct(dto: CreateProductDto) {
    const { type, status, isFeatured, taxStatus, productDetailDto } = dto;
    const product = this.productRepository.create({
      type,
      status,
      isFeatured,
      taxStatus,
    });
    await this.productRepository.save(product);
    const productDetail = productDetailDto.map((productDetailDto) =>
      this.productDetailRepository.create({
        productId: product.id,
        lang: productDetailDto.lang,
        name: productDetailDto.name,
        description: productDetailDto.description,
        shortDescription: productDetailDto.shortDescription,
        slug: productDetailDto.slug,
      }),
    );
    await this.productDetailRepository.save(productDetail);
    product.productDetails = productDetail;
    return product;
  }

  @Transactional()
  async updateProduct(id: string, dto: updateProductDto) {
    const { updateProductDetailDto } = dto;
    const exitsProduct = await this.productRepository.findOne( {where :{ id: id }
      ,
    relations : { productDetails : true }});
    if (!exitsProduct)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else return this.updateProductDetail(exitsProduct, updateProductDetailDto);
  }

  private async updateProductDetail(
    exitsProduct: Product,
    updateProductDetailDto: UpdateProductDetailDto[],
  ) {
    const removeProductDetails: UpdateProductDetailDto[] = [];
    exitsProduct.productDetails.forEach((exitsProductDetailItem) => {
      const existdProductDetail = updateProductDetailDto.some((item) => {
        return item.lang === exitsProductDetailItem.lang;
      });

      if (!existdProductDetail) {
        removeProductDetails.push(exitsProductDetailItem);
        return;
      }
    });

    const updateProductDetail = updateProductDetailDto.map((item) =>
      this.productDetailRepository.create({
        productId: exitsProduct.id,
        lang: item.lang,
        name: item.name,
        description: item.description,
        shortDescription: item.shortDescription,
        slug: item.slug,
      }),
    );
    // use save() method to update

    await this.productDetailRepository.softRemove(removeProductDetails);
    await this.productDetailRepository.save(updateProductDetail);
  }

  async softDeleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else await this.productRepository.softDelete(id);
  }

  async findAll(dto: ProductPagenationDto) {
    const page = dto.page;
    const limit = dto.limit;
    const productQueryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productDetails', 'product_detail');
    //.andWhere('product_detail.product_id = :id', { id: product.id });

    return paginate(productQueryBuilder, { limit, page });
  }

  async findById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations : { productDetails : true}
    });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else return product;
  }

  
}
