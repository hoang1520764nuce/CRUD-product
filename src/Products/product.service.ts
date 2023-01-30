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
  async updateProduct(dto: UpdateProductDto) {
    const {
      id,
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
    exitsProductDetails: ProductDetail[],
  ) {
    // array to hold id in order to remove
    const removeProductDetails: number[] = [];
    const insertProductDetails: ProductDetail[] = [];
    const updateProductDetails: Partial<ProductDetail>[] = [];
    // if old field don't exits on dto - remove
    exitsProductDetails.forEach((dataInDb) => {
      const isExitsInDto = updateProductDetailsDto.some((dataInDto) => {
        return dataInDb.id === dataInDto.id;
      });
      if (!isExitsInDto) {
        removeProductDetails.push(dataInDb.id);
      }
    });

    // if dto don't exits on db - insert
    updateProductDetailsDto.forEach(async (dateInDto) => {
      const isExistInDB = exitsProduct.productDetails.some((dataInDb) => {
        return dateInDto.id === dataInDb.id;
      });

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
            lang: dateInDto.lang,
            name: dateInDto.name,
            description: dateInDto.description,
            shortDescription: dateInDto.shortDescription,
            slug: dateInDto.slug,
          }),
        );
      } else {
        updateProductDetails.push(
          this.productDetailRepository.create({
            id: dateInDto.id,
            lang: dateInDto.lang,
            name: dateInDto.name,
            description: dateInDto.description,
            shortDescription: dateInDto.shortDescription,
            slug: dateInDto.slug,
          }),
        );
      }
    });

    // if user's input no change --> do Nothing
    if (removeProductDetails.length) {
      await Promise.all([
        // delete
        this.productDetailRepository.softDelete(removeProductDetails),
        // update
        ...updateProductDetails.map((item) =>
          this.productDetailRepository.update(item.id, item),
        ),
        // insert
        this.productDetailRepository.save(insertProductDetails),
      ]);
    } else {
      await Promise.all([
        // update
        ...updateProductDetails.map((item) => {
          this.productDetailRepository.update(item.id, item);
        }),
        // insert
        this.productDetailRepository.save(insertProductDetails),
      ]);
    }
  }

  private async updateProductCategory(
    exitsProduct: Product,
    categoryKeys: number[],
    productCategories: ProductCategory[],
  ) {
    const removeProductCategories: number[] = [];
    const insertProductCategories: ProductCategory[] = [];
   //delete all

    productCategories.forEach((dataInDb) => {
      removeProductCategories.push(dataInDb.id);   
    });

    // insert again 
   for ( const item in categoryKeys) {
      const category = this.categoryRepository.findBy({
        key: categoryKeys[item],
      });
      if (!category)
        throw new HttpException(
          'cannot find the category',
          HttpStatus.NOT_FOUND,
        );

      insertProductCategories.push(
        this.productCategoryRepository.create({
          productId: exitsProduct.id,
          categoryKey: categoryKeys[item],
        }),
      );

    }

    //  if user input no change data --> doNothing
   
      
    if (removeProductCategories.length) {
      await Promise.all([
        this.productCategoryRepository.softDelete(removeProductCategories),
        // insert new feild  - old field no change
       this.productCategoryRepository.save(insertProductCategories),
      ]);
    } else this.productCategoryRepository.save(insertProductCategories);
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

  async findById(id: number) {
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
  async softDeleteProduct(id: number) {
    const [product] = await this.productRepository.findBy({ id: id });
    if (!product)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
    else await this.productRepository.softDelete(id);

    const [productDetai] = await this.productDetailRepository.findBy({
      productId: product.id,
    });
    if (!productDetai) {
      throw new HttpException(
        'cannot find the detail of product',
        HttpStatus.NOT_FOUND,
      );
    } else await this.productDetailRepository.softRemove(productDetai);

    const [productCategory] = await this.productCategoryRepository.findBy({
      productId: product.id,
    });
    console.log(productCategory);
    if (!productCategory) {
      throw new HttpException(
        'cannot find the category of product',
        HttpStatus.NOT_FOUND,
      );
    } else await this.productCategoryRepository.softRemove(productCategory);
  }

  @Transactional()
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
