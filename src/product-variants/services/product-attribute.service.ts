import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductAttributePagenationDto } from 'src/product-variants/dto/product-attribute-pagenation.dto';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { deleteListProductAttributeDto } from '../dto/delete-list-product-attribute.dto';
import {
  ProductAttributeDetailDto,
  UpdateProductAttributeDetailDto,
} from '../dto/product-attribute-detail.dto';
import {
  CreateProductAttributeDto,
  UpdateProductAttributeDto,
} from '../dto/product-attribute.dto';
import { ProductAttributeDetail } from '../entities/product-attribute-datail.entity';
import { ProductAttributeTermDetail } from '../entities/product-attribute-term-detail.entity';
import { ProductAttributeTerm } from '../entities/product-attribute-term.entity';
import { ProductAttribute } from '../entities/product-attribute.entity';
import { ProductToAttribute } from '../entities/product-to-attribute.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,

    @InjectRepository(ProductAttributeDetail)
    private readonly productAttributeDetailRepository: Repository<ProductAttributeDetail>,

    @InjectRepository(ProductAttributeTerm)
    private readonly productAttributeTermRepository: Repository<ProductAttributeTerm>,

    @InjectRepository(ProductAttributeTermDetail)
    private readonly productAttributeTermDetailRepository: Repository<ProductAttributeTermDetail>,
  ) {}

  @Transactional()
  async createProductAttribute(dto: CreateProductAttributeDto) {
    const { type, hasAchives, productAttributeDetails } = dto;

    const productAttribute = this.productAttributeRepository.create({
      type,
      hasAchives,
    });
    await this.productAttributeRepository.save(productAttribute);

    const productAttributeDetail = productAttributeDetails.map((item) =>
      this.productAttributeDetailRepository.create({
        productAttributeKey: productAttribute.key,
        lang: item.lang,
        name: item.name,
        slug: item.slug,
        description: item.description,
      }),
    );

    await this.productAttributeDetailRepository.save(productAttributeDetail);

    productAttribute.productAttributeDetails = productAttributeDetail;
  }

  @Transactional()
  async updateProductAttribute(key: number, dto: UpdateProductAttributeDto) {
    const { type, hasAchives, updateProductAttributeDetails } = dto;

    const exitsProductAttribute = await this.productAttributeRepository.findOne(
      {
        where: { key: key },
        relations: ['productAttributeDetails'],
      },
    );

    if (!exitsProductAttribute) {
      console.log('cannot find product attribute');
    }

    const updateProductAttribute = this.productAttributeRepository.create({
      type,
      hasAchives,
    });

    await this.productAttributeRepository.update(key, updateProductAttribute);

    await this.updateProductAttributeDetail(
      exitsProductAttribute,
      updateProductAttributeDetails,
    );
  }

  private async updateProductAttributeDetail(
    exitsProductAttribute: ProductAttribute,
    updateProductAttributeDetailsDto: UpdateProductAttributeDetailDto[],
  ) {
    const productAttributeDetailToRemove: number[] = [];
    const productAttributeDetailToUpdate: Partial<ProductAttributeDetail>[] =
      [];
    const productAttributeDetailToInsert: ProductAttributeDetail[] = [];

    exitsProductAttribute.productAttributeDetails.forEach((dataInDb) => {
      const isExitsInDto = updateProductAttributeDetailsDto.some((dataInDto) => {
        return dataInDb.id === dataInDto.id;
      });

      if (!isExitsInDto) {
        productAttributeDetailToRemove.push(dataInDb.id);
      }

     
  } )

    updateProductAttributeDetailsDto.forEach((dataInDto) => {
      const isExitsInDb = exitsProductAttribute.productAttributeDetails.some(
        (dataInDb) => {
          return dataInDb.id === dataInDto.id;
        },
      );

      if (isExitsInDb) {
        productAttributeDetailToUpdate.push(
          this.productAttributeDetailRepository.create({
            id: dataInDto.id,
            lang: dataInDto.lang,
            name: dataInDto.name,
            slug: dataInDto.slug,
            description: dataInDto.description,
          }),
        );
      } else {
        productAttributeDetailToInsert.push(
          this.productAttributeDetailRepository.create({
            productAttributeKey: exitsProductAttribute.key,
            lang: dataInDto.lang,
            name: dataInDto.name,
            slug: dataInDto.slug,
            description: dataInDto.description,
          }),
        );
      }
    } )

    if (productAttributeDetailToRemove.length) {
      await Promise.all([
        // delete
        this.productAttributeDetailRepository.softDelete(productAttributeDetailToRemove),
        // update
        ...productAttributeDetailToUpdate.map((item) =>
          this.productAttributeDetailRepository.update(item.id, item),
        ),
        // insert
        this.productAttributeDetailRepository.save(productAttributeDetailToInsert),
      ]);
    } else {
      await Promise.all([
        // update
        ...productAttributeDetailToUpdate.map((item) => {
          this.productAttributeDetailRepository.update(item.id, item);
        }),
        // insert
        this.productAttributeDetailRepository.save(productAttributeDetailToInsert),
      ]);
    }

  }

  async findAll(dto: ProductAttributePagenationDto) {
    const { limit, page } = dto;

    const productAttributeQB = this.productAttributeRepository
      .createQueryBuilder('productAttribute')
      .leftJoinAndSelect(
        'productAttribute.productAttributeDetails',
        'productAttributeDetails',
      );

    return paginate(productAttributeQB, { limit, page });
  }

  async findOne(key: number) {
    const productAttribute = await this.productAttributeRepository
      .createQueryBuilder('productAttribute')
      .leftJoinAndSelect(
        'productAttribute.productAttributeDetails',
        'productAttributeDetails',
      )
      .where('productAttribute.key = :key', { key: key })
      .getOne();

    if (!productAttribute) {
      throw new Error('cannot find product attribute');
    }

    return productAttribute;
  }

  @Transactional()
  async softRemove(key: number) {
    const productAttribute = await this.productAttributeRepository.findOneBy({
      key: key,
    });
    if (!productAttribute) {
      throw new Error('cannot find product attribute');
    }

    const productAttributeDetails =
      await this.productAttributeDetailRepository.find({
        where: { productAttributeKey: key },
      });
    await this.productAttributeRepository.softDelete(key);
    await this.productAttributeDetailRepository.softRemove(
      productAttributeDetails,
    );
  }

  @Transactional()
  async softListRemove(dto: deleteListProductAttributeDto) {
    const { keys } = dto;
    const productAttribute = await this.productAttributeRepository.findBy({
      key: In(keys),
    });

    if (!productAttribute) {
      console.log('cannot find product attribute');
    }

    const productAttributeDetails =
      await this.productAttributeDetailRepository.find({
        where: { productAttributeKey: In(keys) },
      });

    await this.productAttributeRepository.softDelete(keys);
    await this.productAttributeDetailRepository.softRemove(
      productAttributeDetails,
    );
  }
}
