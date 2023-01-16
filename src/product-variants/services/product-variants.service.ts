import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductVariantPagenationDto } from 'src/Products/dtos/product-variant-pagenation.dto';
import { In, Repository } from 'typeorm';
import { deleteListProductVariantDto } from '../dto/detele-list-product-variant.dto';
import { CreateProductVariantDto } from '../dto/product-variant.dto';
import { UpdateProductVariantDto } from '../dto/product-variant.dto';
import { ProductToVariant } from '../entities/product-to-variant.entity';
import { ProductVariant } from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,

    @InjectRepository(ProductToVariant)
    private readonly productToVariantRepository: Repository<ProductToVariant>,
  ) {}

  async createProductVariant(createProductVariantDto: CreateProductVariantDto) {
    const {price, sku, quantity, salePrice, onSale, productId} = createProductVariantDto ;
    console.log(createProductVariantDto);
    console.log(price);
    console.log(sku);
    console.log(quantity);
    console.log(salePrice);
    console.log(onSale);
    const productVariant = this.productVariantRepository.create(
      {
        price : price,
        sku : sku,
        quantity : quantity,
        salePrice : salePrice,
        onSale : onSale
      }
    );

    await this.productVariantRepository.insert(productVariant);

    const productToVariant = this.productToVariantRepository.create(
      {
        productId:productId,
        productVariantId: productVariant.id,
      }
    )

    await this.productToVariantRepository.insert(productToVariant);


   // return  this.productVariantRepository.save(productVariant);
  }

  async updateProductVariant( id : number , updateProductVariantDto: UpdateProductVariantDto) {

    const {price, sku, quantity, salePrice, onSale, productId} = updateProductVariantDto ;
    const updateProductVariant = {
      id : id,
      price : price,
      sku : sku,
      quantity : quantity,
      salePrice : salePrice,
      onSale : onSale
    }
   const [productVariant] = await this.productVariantRepository.findBy(
    {id : id}
   ) 
    if(!productVariant){
      console.log('fail to update productVariant');
    }
    await this.productVariantRepository.save( updateProductVariant );
   
    await  this.updateProductToVariant(productId , productVariant.id);
  }

private async updateProductToVariant( productId : number , productVariantId : number ) {
  
}

  async deleteProductVariant(id : number){
    const productVariant = await this.productVariantRepository.findOneBy(
      { id : id } )
    if(!productVariant){
      console.log('fail to delete productVariant - cannot find');
    }
    await this.productVariantRepository.softDelete( id );
  }

  async deleteListProductVariant( dto : deleteListProductVariantDto){
   const { ids } = dto ;
   const productVariants = await this.productVariantRepository.findBy(
      { id :In(ids) }
   )
    if(!productVariants){
      console.log('fail to delete productVariants - cannot find');
    }
    await this.productVariantRepository.softRemove( productVariants );
  } 


  async findAllProductVariants( dto : ProductVariantPagenationDto) {
    const { page, limit } = dto;
    const ProductVariantsQB = this.productVariantRepository
    .createQueryBuilder( 'productVariant' )
    
    return paginate( ProductVariantsQB  ,{limit, page}) ;
  }

  async findOneProductVariant(id : number) {
    const productVariant = await this.productVariantRepository.findOneBy(
      { id : id } )
    if(!productVariant){
      console.log('fail to find productVariant - cannot find');
    }
    return productVariant ;
  }

}
