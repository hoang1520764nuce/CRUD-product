import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { paginate } from 'nestjs-typeorm-paginate';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { deleteListProductAttributeTermDto } from '../dto/delete-list-product-attribute-term-detail.dto';
import { ProductAttributeTermDetailDto } from '../dto/product-attribute-term-detail.dto';
import { ProductAttributeTermPagenationDto } from '../dto/product-attribute-term-pagenation.dto';
import {
  CreateProductAttributeTermDto,
  UpdateProductAttributeTermDto,
} from '../dto/product-attribute-term.dto';
import { ProductAttributeTermDetail } from '../entities/product-attribute-term-detail.entity';

import { ProductAttributeTerm } from '../entities/product-attribute-term.entity';
import { ProductAttribute } from '../entities/product-attribute.entity';

@Injectable()
export class ProductAttributeTermService {
  constructor(
    @InjectRepository(ProductAttributeTerm)
    private productAttributeTermRepository: Repository<ProductAttributeTerm>,

    @InjectRepository(ProductAttributeTermDetail)
    private productAttributeTermDetailRepository: Repository<ProductAttributeTermDetail>,

    @InjectRepository(ProductAttribute)
    private productAttributeRepository: Repository<ProductAttribute>,
  ) {}

  @Transactional()
  async createProductAttributeTerm(dto: CreateProductAttributeTermDto) {
    const { productAttributeKey, productAttributeTermDetails } = dto;

    const productAttribute = await this.productAttributeRepository.findOneBy({
      key: productAttributeKey,
    });

    if (!productAttribute) {
      throw new Error('Product Attribute not found');
    }

    const productAttributeTerm = this.productAttributeTermRepository.create({
      productAttributeKey,
    });

    await this.productAttributeTermRepository.save(productAttributeTerm);

    const productAttributeTermDetail = productAttributeTermDetails.map((item) =>
      this.productAttributeTermDetailRepository.create({
        productAttributeTermId: productAttributeTerm.id,
        lang: item.lang,
        value: item.value,
      }),
    );

    await this.productAttributeTermDetailRepository.save(
      productAttributeTermDetail,
    );
    productAttributeTerm.productAttributeTermDetails =
      productAttributeTermDetail;

    return productAttributeTerm;
  }

  @Transactional()
  async updateProductAttributeTerm(
    id: number,
    dto: UpdateProductAttributeTermDto,
  ) {
    const { productAttributeKey, updateProductAttributeTermDetailsDto } = dto;

    const exitsProductAttributeTerm =
      await this.productAttributeTermRepository.findOne({
        where: { id: id },
        relations: {
          productAttributeTermDetails: true,
          productAttribute: true,
        },
      });

    if (!exitsProductAttributeTerm)
      throw new HttpException(
        'cannot find the productAttibuteTerm',
        HttpStatus.NOT_FOUND,
      );

    Promise.all([
      this.productAttributeTermRepository.update(id, { productAttributeKey }),
      this.updateProductAttributeTermDetail(
        updateProductAttributeTermDetailsDto,
        exitsProductAttributeTerm,
      ),
    ]);
  }

  private async updateProductAttributeTermDetail(
    productAttributeTermDetailsDto: ProductAttributeTermDetailDto[],
    exitsProductAttributeTerm: ProductAttributeTerm,
  ) {
    const removeProductAttributeTermDetails: number[] = [];
    const updateProductAttributeTermDetails: Partial<ProductAttributeTermDetail>[] = [];
    const insertProductAttributeTermDetails: ProductAttributeTermDetail[] = [];

    exitsProductAttributeTerm.productAttributeTermDetails.forEach((dataInDb) => {
      const isExitsInDto = productAttributeTermDetailsDto.some(
        (dataInDto) => dataInDto.id === dataInDb.id,
      );

      if (!isExitsInDto) {
        removeProductAttributeTermDetails.push(dataInDb.id);
      }
    });

    productAttributeTermDetailsDto.forEach( dataInDto => 
      {
        const isExitsInDb = exitsProductAttributeTerm.productAttributeTermDetails.some( dataInDb => 
          {
            return dataInDto.id === dataInDb.id
          })

          if(!isExitsInDb) {
            insertProductAttributeTermDetails.push(
              this.productAttributeTermDetailRepository.create({
                productAttributeTermId: exitsProductAttributeTerm.id,
                lang: dataInDto.lang,
                value: dataInDto.value,
              })
            )
          } else {
            updateProductAttributeTermDetails.push(
              this.productAttributeTermDetailRepository.create({
              id: dataInDto.id,
              productAttributeTermId: exitsProductAttributeTerm.id,
              lang: dataInDto.lang,
              value: dataInDto.value,
            })
            )
          }
      })
    
    console.log('removeProductAttributeTermDetails',removeProductAttributeTermDetails);
    console.log('updateProductAttributeTermDetails',updateProductAttributeTermDetails);
    console.log('insertProductAttributeTermDetails',insertProductAttributeTermDetails);

    if (removeProductAttributeTermDetails.length) {
      await Promise.all([
        // delete
        this.productAttributeTermDetailRepository.softDelete(
          removeProductAttributeTermDetails,
        ),
        // update
        ...updateProductAttributeTermDetails.map((item) =>
          this.productAttributeTermDetailRepository.update(item.id, item),
        ),
        // insert
        this.productAttributeTermDetailRepository.save(
          insertProductAttributeTermDetails,
        ),
      ]);
    } else {
      await Promise.all([
        // update
        ...updateProductAttributeTermDetails.map((item) => {
          this.productAttributeTermDetailRepository.update(item.id, item);
        }),
        // insert
        this.productAttributeTermDetailRepository.save(
          insertProductAttributeTermDetails,
        ),
      ]);
    }
  }

  async findAll(dto: ProductAttributeTermPagenationDto) {
    const { limit, page } = dto;
    const productAttributeTermQB = this.productAttributeTermRepository
      .createQueryBuilder('productAttributeTerm')
      .leftJoinAndSelect(
        'productAttributeTerm.productAttributeTermDetails',
        'productAttributeTermDetails',
      )
      .leftJoinAndSelect(
        'productAttributeTerm.productAttribute',
        'productAttribute',
      );

    return paginate(productAttributeTermQB, { limit, page });
  }

  async findOne(id: number) {
    const productAttributeTerm = await this.productAttributeTermRepository
      .createQueryBuilder('productAttributeTerm')
      .leftJoinAndSelect(
        'productAttributeTerm.productAttributeTermDetails',
        'productAttributeTermDetails',
      )
      .leftJoinAndSelect(
        'productAttributeTerm.productAttribute',
        'productAttribute',
      )
      .where('productAttributeTerm.id = :id', { id: id })
      .getOne();

    if (!productAttributeTerm) {
      throw new Error('Product Attribute Term not found');
    }

    return productAttributeTerm;
  }

  @Transactional()
  async deleteProductAttributeTerm(id: number) {
    const productAttributeTerm =
      await this.productAttributeTermRepository.findOneBy({ id: id });

    if (!productAttributeTerm) {
      throw new Error('Product Attribute Term not found');
    }

    await this.productAttributeTermRepository.softDelete(id);

    const productAttributeTermDetail =
      await this.productAttributeTermDetailRepository.findOneBy({
        productAttributeTermId: productAttributeTerm.id,
      });

    if (!productAttributeTermDetail) {
      throw new Error('Product Attribute Term Detail not found');
    }

    await this.productAttributeTermDetailRepository.softDelete(
      productAttributeTermDetail.id,
    );
  }

  @Transactional()
  async deleteListProductAttributeTermDetail(
    dto: deleteListProductAttributeTermDto,
  ) {
    const { ids } = dto;

    const productAttributeTerm =
      await this.productAttributeTermRepository.findOneBy({ id: In(ids) });

    if (!productAttributeTerm) {
      throw new Error('Product Attribute Term not found');
    }

    const productAttributeTermDetail =
      await this.productAttributeTermDetailRepository.findOneBy({
        productAttributeTermId: In(ids),
      });

    if (!productAttributeTermDetail) {
      throw new Error('Product Attribute Term Detail not found');
    }

    await this.productAttributeTermRepository.softDelete(ids);

    await this.productAttributeTermDetailRepository.softDelete(
      productAttributeTermDetail.id,
    );
  }
}
