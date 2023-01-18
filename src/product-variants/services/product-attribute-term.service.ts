import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    const productAttributeTerm =  this.productAttributeTermRepository.create({
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
  }

  @Transactional()
  async updateProductAttributeTerm(id: number, dto: UpdateProductAttributeTermDto) {
    const {
        productAttributeKey,
        productAttributeTermDetails,
    } = dto;

    const exitsProductAttributeTerm = await this.productAttributeTermRepository.findOne({
      where: { id: id },
      relations: { productAttributeTermDetails: true, productAttribute: true },
    });

    if (!productAttributeTermDetails)
      throw new HttpException('cannot find the product', HttpStatus.NOT_FOUND);
      
    Promise.all([
      this.productAttributeTermRepository.update(id, { productAttributeKey }),
      this.updateProductAttributeTermDetail(productAttributeTermDetails , exitsProductAttributeTerm),  
    ]);
  }

 private async updateProductAttributeTermDetail(
    productAttributeTermDetails : ProductAttributeTermDetailDto[] ,
    productAttributeTerm : ProductAttributeTerm
    ) {
        // an array to store remove id we need
        const removeIdAttributeTermDetails : number[] = [];
        // an array to store update id we need
        const updateIdAttributeTermDetails : ProductAttributeTermDetailDto[] = [];

        //  compare data on dto vs data on db
        //  if data on db not in dto --> delete this data
        //  if data on db  == in dto --> update this data
        productAttributeTerm.productAttributeTermDetails.forEach((item) => {
            const exits = productAttributeTermDetails.some(
                (itemDto) => itemDto.lang === item.lang && 
                itemDto.value === item.value 
            );
            if (exits) {
               
                    this.productAttributeTermDetailRepository.update(
                        productAttributeTerm.id,
                       { lang: item.lang,
                        value: item.value}
                    )
                
            } else {
                removeIdAttributeTermDetails.push(item.id);
            }
        }
        );

        // compare data on db vs data on dto
        // if data on dto not in db --> push this data to updateIdAttributeTermDetails
        
        productAttributeTermDetails.forEach( (item) =>
            {
                const isDbExitsInDto = productAttributeTerm.productAttributeTermDetails.some( ( itemInDb ) =>
                 {
                    return itemInDb.lang === item.lang && itemInDb.value === item.value
                 }
                )

                if(!isDbExitsInDto)
                {
                    updateIdAttributeTermDetails.push(
                        this.productAttributeTermDetailRepository.create({
                            productAttributeTermId: productAttributeTerm.id,
                            lang: item.lang,
                            value: item.value,
                        })
                    );
                }
            }
        )

        if(removeIdAttributeTermDetails.length){
            await Promise.all([
                this.productAttributeTermDetailRepository.softDelete(removeIdAttributeTermDetails),
                this.productAttributeTermDetailRepository.save(updateIdAttributeTermDetails)
            ])
        }else this.productAttributeTermDetailRepository.save(updateIdAttributeTermDetails)
        
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
