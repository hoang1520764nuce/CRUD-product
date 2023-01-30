import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductVariantPagenationDto } from 'src/product-variants/dto/product-variant-pagenation.dto';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { deleteListProductVariantDto } from '../dto/detele-list-product-variant.dto';
import { CreateProductVariantDto } from '../dto/product-variant.dto';
import { UpdateProductVariantDto } from '../dto/product-variant.dto';
import { ProductToVariant } from '../entities/product-to-variant.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { File } from '../entities/file.entity';
import { ProductVariantImage } from '../entities/product-variant-image.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,

    @InjectRepository(ProductToVariant)
    private readonly productToVariantRepository: Repository<ProductToVariant>,

    @InjectRepository(ProductVariantImage)
    private readonly productVariantImageRepository: Repository<ProductVariantImage>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  @Transactional()
  async createProductVariant(createProductVariantDto: CreateProductVariantDto) {
    const { price, sku, quantity, salePrice, onSale, productIds, fileIds } =
      createProductVariantDto;
    // create product variant
    const productVariant = this.productVariantRepository.create({
      price: price,
      sku: sku,
      quantity: quantity,
      salePrice: salePrice,
      onSale: onSale,
    });

    await this.productVariantRepository.insert(productVariant);
    // create product to variant

    const productToVariant = productIds.map((inputed) =>
      this.productToVariantRepository.create({
        productId: inputed,
        productVariantId: productVariant.id,
      }),
    );

    await this.productToVariantRepository.save(productToVariant);
    productVariant.productToVariants = productToVariant;
    // create product variant image
    const productVariantImage = fileIds.map((inputed) =>
      this.productVariantImageRepository.create({
        imageId: inputed,
        productVariantId: productVariant.id,
      }),
    );

    await this.productVariantImageRepository.save(productVariantImage);
    productVariant.productVariantImages = productVariantImage;

    return productVariant;
  }

  @Transactional()
  async updateProductVariant(
    id: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ) {
    const { price, sku, quantity, salePrice, onSale, productIds, fileIds } =
      updateProductVariantDto;
    const productVariant = await this.productVariantRepository.findOne({
      where: { id: id },
      relations: { productToVariants: true, productVariantImages: true },
    });

    // console.log(productVariant);
    if (!productVariant) {
      // console.log('fail to find productVariant');
    }

    const updateProductVariant = {
      id: id,
      price: price,
      sku: sku,
      quantity: quantity,
      salePrice: salePrice,
      onSale: onSale,
    };
    await this.productVariantRepository.update(updateProductVariant.id,updateProductVariant);

    await this.updateProductToVariant(
      productIds,
      productVariant.id,
      productVariant.productToVariants,
    );

    await this.updateProductVariantImage(
      fileIds,
      productVariant.id,
      productVariant.productVariantImages,
    );
  }

  private async updateProductToVariant(
    productIds: number[],
    productVariantId: number,
    exitsProductToVariants: ProductToVariant[],
  ) {

    const productToVariantToRemove: number[] = [];
    const productToVariantToInsert: ProductToVariant[] = [];

    exitsProductToVariants.forEach((exitsProductToVariant) => {
        productToVariantToRemove.push(exitsProductToVariant.id);
    });

    for ( const item in productIds) {

      const [products] = await this.productRepository.findBy({
        id: In(productIds),
      });
      if (!products) {
        throw new HttpException(
          'cannot find the products',
          HttpStatus.NOT_FOUND,
        );
      }

      productToVariantToInsert.push(
        this.productToVariantRepository.create({
          productId: productIds[item],
          productVariantId: productVariantId,
        }),
      );

    }
    //  if user input no change data --> doNothing
    if (!productToVariantToRemove.length) {
      this.productToVariantRepository.save(productToVariantToInsert);
    } else {
      await Promise.all([
        this.productToVariantRepository.softDelete(productToVariantToRemove),
        this.productToVariantRepository.save(productToVariantToInsert),
      ]);
    }
  }

  private async updateProductVariantImage(
    fileIds: number[],
    productVariantId: number,
    exitsProductVariantImages: ProductVariantImage[],
  ) {
    const [productVariantImage] =
      await this.productVariantImageRepository.findBy({ imageId: In(fileIds) });
    if (!productVariantImage) {
      // console.log('fail to update productVariantImage - not found');
    }
    const productVariantImageToRemove: number[] = [];
    const productVariantImageToInsert: ProductVariantImage[] = [];
    
    exitsProductVariantImages.forEach((exitsProductVariantImage) => {
      productVariantImageToRemove.push(exitsProductVariantImage.id);
    });

    for ( const item in fileIds) {
      const [file] = await this.fileRepository.findBy({
        id: In(fileIds),
      });
      if (!file) {
        throw new HttpException('cannot find the file', HttpStatus.NOT_FOUND);
      }

      productVariantImageToInsert.push(
        this.productVariantImageRepository.create({
          imageId: fileIds[item],
          productVariantId: productVariantId,
        }),
      );
    }

    //  if user input no change data --> doNothing
    if (productVariantImageToRemove.length) {
      await Promise.all([
        this.productVariantImageRepository.softDelete(
          productVariantImageToRemove,
        ),
        this.productVariantImageRepository.save(productVariantImageToInsert),
      ]);
    } else this.productVariantImageRepository.save(productVariantImageToInsert);
  }

  @Transactional()
  async deleteProductVariant(id: number) {
    const [productVariant] = await this.productVariantRepository.findBy({
      id: id,
    });
    if (!productVariant) {
      // console.log('fail to delete productVariant - cannot find');
    }
    await this.productVariantRepository.softDelete(id);

    const [productToVariant] = await this.productToVariantRepository.findBy({
      productVariantId: id,
    });

    if (!productToVariant) {
      // console.log('fail to delete productToVariant - cannot find');
    }
    await this.productToVariantRepository.softDelete(productToVariant.id);

    const [productVariantImage] =
      await this.productVariantImageRepository.findBy({ productVariantId: id });
    if (!productVariantImage) {
      // console.log('fail to delete productVariantImage - cannot find');
    }
    await this.productVariantImageRepository.softDelete(productVariantImage.id);
  }

  @Transactional()
  async deleteListProductVariant(dto: deleteListProductVariantDto) {
    const { ids } = dto;
    const productVariants = await this.productVariantRepository.findBy({
      id: In(ids),
    });
    if (!productVariants) {
      // console.log('fail to delete productVariants - cannot find');
    }
    await this.productVariantRepository.softRemove(productVariants);

    const productToVariants = await this.productToVariantRepository.findBy({
      productVariantId: In(ids),
    });
    if (!productToVariants) {
      // console.log('fail to delete productToVariants - cannot find');
    }

    await this.productToVariantRepository.softRemove(productToVariants);

    const productVariantImages =
      await this.productVariantImageRepository.findBy({
        productVariantId: In(ids),
      });
    if (!productVariantImages) {
      // console.log('fail to delete productVariantImages - cannot find');
    }
    await this.productVariantImageRepository.softRemove(productVariantImages);
  }

  async findAllProductVariants(dto: ProductVariantPagenationDto) {
    const { page, limit } = dto;
    const ProductVariantsQB = this.productVariantRepository
      .createQueryBuilder('productVariant')
      .leftJoinAndSelect('productVariant.productToVariants', 'productToVariant')
      .leftJoinAndSelect('productToVariant.product', 'product')
      .leftJoinAndSelect(
        'productVariant.productVariantImages',
        'productVariantImage',
      )
      .leftJoinAndSelect('productVariantImage.file', 'image');

    return paginate(ProductVariantsQB, { limit, page });
  }

  async findOneProductVariant(id: number) {
    const productVariant = await this.productVariantRepository.find({
      relations: {
        productToVariants: { product: true },
        productVariantImages: { file: true },
      },
      where: { id: id },
    });
    if (!productVariant) {
      // console.log('fail to find productVariant - cannot find');
    }
    return productVariant;
  }
}
