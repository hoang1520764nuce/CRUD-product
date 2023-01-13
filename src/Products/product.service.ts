import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductDetail } from 'src/product-details/entities/product-detail.entity';
import { Transactional } from 'typeorm-transactional';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/product.dto';
import { ProductPagenationDto } from './dtos/product-pagenation.dto';
import { UpdateProductDto } from './dtos/product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDetailDto } from 'src/product-details/dtos/update-product-detail.dto';
import { DeleteListProductReqDto } from './dtos/delete-list-product.dto';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class productService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,

    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  // using transaction
  @Transactional()
  async createProduct(dto: CreateProductDto) {
    const {
      type,
      status,
      isFeatured,
      taxStatus,
      productDetailsDto,
      categoryKeys,
    } = dto;
    const product = this.productRepository.create({
      type,
      status,
      isFeatured,
      taxStatus,
    });
    await this.productRepository.save(product);

    const productDetail = productDetailsDto.map((inputed) =>
      this.productDetailRepository.create({
        productId: product.id,
        lang: inputed.lang,
        name: inputed.name,
        description: inputed.description,
        shortDescription: inputed.shortDescription,
        slug: inputed.slug,
      }),
    );
    console.log(productDetailsDto);
    console.log(categoryKeys);
    const productCategory = categoryKeys.map((inputed) =>
      this.productCategoryRepository.create({
        productId: product.id,
        categoryKey: inputed,
      }),
    );

    await this.productDetailRepository.save(productDetail);
    product.productDetails = productDetail;

    await this.productCategoryRepository.save(productCategory);
    product.productCategories = productCategory;

    return product;
  }

  @Transactional()
  async updateProduct(id: string, dto: UpdateProductDto) {
    const { updateProductDetailsDto, categoryKeys } = dto;
    const exitsProduct = await this.productRepository.findOne({
      where: { id: id },
      relations: { productDetails: true, productCategories: true },
    });
    if (!exitsProduct)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else
      return this.updateProductDetail(
        exitsProduct,
        updateProductDetailsDto,
        categoryKeys,
      );
  }

  private async updateProductDetail(
    exitsProduct: Product,
    updateProductDetailsDto: UpdateProductDetailDto[],
    categoryKeys: string[],
  ) {
    const removeProductDetails: UpdateProductDetailDto[] = [];
    exitsProduct.productDetails.forEach((exitsProductDetailItem) => {
      const existdProductDetail = updateProductDetailsDto.some((item) => {
        return item.lang === exitsProductDetailItem.lang;
      });

      if (!existdProductDetail) {
        removeProductDetails.push(exitsProductDetailItem);
        return;
      }
    });

    const updateProductDetail = updateProductDetailsDto.map((item) =>
      this.productDetailRepository.create({
        productId: exitsProduct.id,
        lang: item.lang,
        name: item.name,
        description: item.description,
        shortDescription: item.shortDescription,
        slug: item.slug,
      }),
    );

    const removeProductCategory: ProductCategory[] = [];
    exitsProduct.productCategories.forEach((exitsProductCategoryItem) => {
      const existdProductCategory = categoryKeys.some((item) => {
        return item === exitsProductCategoryItem.categoryKey;
      });

      if (!existdProductCategory) {
        removeProductCategory.push(exitsProductCategoryItem);
        return;
      }
    });

    const updateProductCategory = categoryKeys.map((item) =>
      this.productCategoryRepository.create({
        productId: exitsProduct.id,
        categoryKey: item,
      }),
    );

    // use save() method to update
    await this.productDetailRepository.softRemove(removeProductDetails);
    await this.productDetailRepository.save(updateProductDetail);

    await this.productCategoryRepository.softRemove(removeProductCategory);
    await this.productCategoryRepository.save(updateProductCategory);
  }

  async findAll(dto: ProductPagenationDto) {
    const page = dto.page;
    const limit = dto.limit;
    const productQueryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productDetails', 'ProductDetail')
      .leftJoinAndSelect('product.productCategories', 'ProductCategory')
      .leftJoinAndSelect('ProductCategory.category', 'Category')
      .leftJoinAndSelect('Category.categoryDetails', 'CategoryDetail');

    return paginate(productQueryBuilder, { limit, page });
  }

  async findById(id: string) {
    const product = await this.productRepository.find({
      relations: {
        productDetails: true,
        productCategories: { category: { categoryDetails: true } },
      },
      where: { id: id },
    });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else return product;
  }

  @Transactional()
  async softDeleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else await this.productRepository.softDelete(id);

    const productDetai = await this.productDetailRepository.findOneBy({
      productId: product.id,
    });
    if (!productDetai) {
      throw new HttpException(
        'cannot find the detail of product',
        HttpStatus.NOT_FOUND,
      );
    } else await this.productDetailRepository.softRemove(productDetai);

    const productCategory = await this.productCategoryRepository.findOneBy({
      productId: product.id,
    });
    if (!productCategory) {
      throw new HttpException(
        'cannot find the category of product',
        HttpStatus.NOT_FOUND,
      );
    } else await this.productCategoryRepository.softRemove(productCategory);
  }

  async softDeleteListProduct(dto: DeleteListProductReqDto) {
    const { ids } = dto;
    const products = await this.productRepository.findBy({ id: In(ids) });
    products.forEach((product) => {
      if (!product)
        throw new HttpException(
          'cannot find the product',
          HttpStatus.NOT_FOUND,
        );
    });

    const productDetails = await this.productDetailRepository.findBy({
      productId: In(ids),
    });

    const productCategories = await this.productCategoryRepository.findBy({
      productId: In(ids),
    });
    await this.productRepository.softDelete(ids);
    await this.productDetailRepository.softRemove(productDetails);
    await this.productCategoryRepository.softRemove(productCategories);
  }
}
