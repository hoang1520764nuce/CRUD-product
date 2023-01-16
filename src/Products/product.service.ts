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
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class productService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,

    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
    const {
      type,
      status,
      isFeatured,
      taxStatus,
      updateProductDetailsDto,
      categoryKeys,
    } = dto;

    const exitsProduct = await this.productRepository.findOne({
      where: { id: id },
      relations: { productDetails: true, productCategories: true },
    });
    if (!exitsProduct)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    Promise.all([
      this.productRepository.update(id, {
        type,
        status,
        isFeatured,
        taxStatus,
      }),
      this.updateProductDetail(
        exitsProduct,
        updateProductDetailsDto,
        exitsProduct.productDetails,
      ),
      this.updateProductCategory(
        exitsProduct,
        categoryKeys,
        exitsProduct.productCategories,
      ),
    ]);

    
  }

  private async updateProductDetail(
    exitsProduct: Product,
    updateProductDetailsDto: UpdateProductDetailDto[],
    productDetails: ProductDetail[],
  ) {
    // array to hold id to remove
    const removeProductDetails: string[] = [];
    const insertProductDetails: UpdateProductDetailDto[] = [];
    // if old field don't exits on dto - remove
    productDetails.forEach((exitsProductDetailItem) => {
      const existdProductDetail = updateProductDetailsDto.some((item) => {
        return item.lang === exitsProductDetailItem.lang;
      });
      if (!existdProductDetail) {
        removeProductDetails.push(exitsProductDetailItem.id);
      }
    });

    // if dto don't exits on db - insert
    updateProductDetailsDto.forEach(async (item) => {
      const isExistInDB = exitsProduct.productDetails.some(
        (exitsProductDetailItem) => {
          return item.lang === exitsProductDetailItem.lang;
        },
      );

      const productDetail = this.productDetailRepository.findBy({
        id: exitsProduct.id,
      });
      if (!productDetail)
        throw new HttpException(
          'cannot find the product detail',
          HttpStatus.NOT_FOUND,
        );

      if (!isExistInDB) {
        insertProductDetails.push(
          this.productDetailRepository.create({
            productId: exitsProduct.id,
            lang: item.lang,
            name: item.name,
            description: item.description,
            shortDescription: item.shortDescription,
            slug: item.slug,
          }),
        );
      }
    });

    await Promise.all([
      this.productDetailRepository.softDelete(removeProductDetails),
      this.productDetailRepository.insert(insertProductDetails),
    ]);
    // await this.productDetailRepository.softDelete(removeProductDetails);
    // await this.productDetailRepository.insert(insertProductDetails);
  }

  private async updateProductCategory(
    exitsProduct: Product,
    categoryKeys: string[],
    productCategories: ProductCategory[],
  ) {
    const removeProductCategories: string[] = [];
    const insertProductCategories: ProductCategory[] = [];
    // if old field don't exits on dto - remove

    productCategories.forEach((exitsProductCategoryItem) => {
      const existdProductCategory = categoryKeys.some((item) => {
        console.log(item, exitsProductCategoryItem.categoryKey);
        return item === exitsProductCategoryItem.categoryKey;
      });
      console.log(existdProductCategory);
      if (!existdProductCategory) {
        removeProductCategories.push(exitsProductCategoryItem.id);
      }
    });
    console.log(removeProductCategories);
    // if dto don't exits on db - insert
    categoryKeys.forEach(async (item) => {
      const isExistInDB = productCategories.some((exitsProductCategoryItem) => {
        return item === exitsProductCategoryItem.categoryKey;
      });

      const [category] = await this.categoryRepository.findBy({ key: item });

      if (!category) {
        throw new HttpException(
          'cannot find the category',
          HttpStatus.NOT_FOUND,
        );
      }

      if (!isExistInDB) {
        insertProductCategories.push(
          this.productCategoryRepository.create({
            productId: exitsProduct.id,
            categoryKey: item,
          }),
        );
      }
    });

    await Promise.all([
      this.productCategoryRepository.softDelete(removeProductCategories),
      // insert new feild  - old field no change
      this.productCategoryRepository.insert(insertProductCategories),
    ]);
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
