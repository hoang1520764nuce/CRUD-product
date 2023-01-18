import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductAttributePagenationDto } from 'src/product-variants/dto/product-attribute-pagenation.dto';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { deleteListProductAttributeDto } from '../dto/delete-list-product-attribute.dto';
import { ProductAttributeDetailDto } from '../dto/product-attribute-detail.dto';
import { CreateProductAttributeDto } from '../dto/product-attribute.dto';
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
    async updateProductAttribute(key: number, dto: CreateProductAttributeDto) {
        const { type, hasAchives, productAttributeDetails } = dto;

        const exitsProductAttribute = await this.productAttributeRepository.findOne({
            where: { key : key },
            relations: ['productAttributeDetails'],
        });

        if(!exitsProductAttribute) 
        {
            console.log('cannot find product attribute');
        }

        const updateProductAttribute = this.productAttributeRepository.create({
            type,
            hasAchives,
        })

        await this.productAttributeRepository.update(key, updateProductAttribute);

        await this.updateProductAttributeDetail(exitsProductAttribute , productAttributeDetails);
    }

    private async updateProductAttributeDetail( exitsProductAttribute : ProductAttribute ,productAttributeDetails : ProductAttributeDetailDto[] ){

           const productAttributeDetailToRemove : number[] = [] ;
           const productAttributeDetailToUpdate : ProductAttributeDetail[] = [] ;

              exitsProductAttribute.productAttributeDetails.forEach((item) => {
                const isExistInDto = productAttributeDetails.some((dtoItem) => dtoItem.lang === item.lang);
                if (!isExistInDto) {
                    productAttributeDetailToRemove.push(item.id);
                    }
            });

            productAttributeDetails.forEach(async(item) => {
                const isExistInDb = exitsProductAttribute.productAttributeDetails.some(
                    (dbItem) => dbItem.lang === item.lang,
                );
                if (!isExistInDb) {
                    
                    productAttributeDetailToUpdate.push(
                        this.productAttributeDetailRepository.create({
                            productAttributeKey: exitsProductAttribute.key,
                            lang: item.lang,
                            name: item.name,
                            slug: item.slug,
                            description: item.description,
                        }),
                    );
                }
            }
        );
// date no change - do nothing
        if(productAttributeDetailToRemove.length)
        {
            await Promise.all([
                 this.productAttributeDetailRepository.softDelete(productAttributeDetailToRemove),
                 this.productAttributeDetailRepository.insert(productAttributeDetailToUpdate),
            ])
           
    }
        else this.productAttributeDetailRepository.save(productAttributeDetailToUpdate) ;
    } 
    

    async findAll(dto : ProductAttributePagenationDto){
        const { limit , page } = dto ;

        const productAttributeQB = this.productAttributeRepository
        .createQueryBuilder('productAttribute')
        .leftJoinAndSelect('productAttribute.productAttributeDetails', 'productAttributeDetails')

        return paginate(productAttributeQB, { limit,page})
    } 
    

    async findOne(key : number){
        const productAttribute = await this.productAttributeRepository
        .createQueryBuilder('productAttribute')
        .leftJoinAndSelect('productAttribute.productAttributeDetails', 'productAttributeDetails')
        .where('productAttribute.key = :key', { key : key })
        .getOne();

        if(!productAttribute)
        {
            throw new Error('cannot find product attribute');
        }

        return productAttribute ;
    }

    @Transactional()
    async softRemove(key : number){
        const productAttribute = await this.productAttributeRepository.findOneBy(
            {key : key});
        if(!productAttribute)
        {
            throw new Error('cannot find product attribute');
        }

        const productAttributeDetails = await this.productAttributeDetailRepository.find({
            where: { productAttributeKey : key },
        });
        await this.productAttributeRepository.softDelete(key);
        await this.productAttributeDetailRepository.softRemove(productAttributeDetails);


    }

    @Transactional()
    async softListRemove(dto : deleteListProductAttributeDto){
        const { keys }  = dto ;
        const productAttribute = await this.productAttributeRepository.findBy(
            {key : In(keys)});

        if(!productAttribute)
        {
            console.log('cannot find product attribute');
        }

        const productAttributeDetails = await this.productAttributeDetailRepository.find({
            where: { productAttributeKey : In(keys) },
        });

        await this.productAttributeRepository.softDelete(keys);
        await this.productAttributeDetailRepository.softRemove(productAttributeDetails);
    }
}
