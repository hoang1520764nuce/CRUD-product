import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsArray, IsEnum, IsNumber } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { CreateProductDetailDto } from 'src/product-details/dtos/create-product-detail.dto';
import { UpdateProductDetailDto } from 'src/product-details/dtos/update-product-detail.dto';
import {
  ProductStatus,
  ProductTaxStatus,
  ProductType,
} from '../enums/product.enumtype';

export class ProductReqDto {
  @ApiProperty({ enum: ['simple', 'configuarable'], default: 'simple' })
  @IsEnum(ProductType)
  readonly type: ProductType;

  @ApiProperty({ enum: ['draft', 'publish'], default: 'draft' })
  @IsEnum(ProductStatus)
  readonly status: ProductStatus;

  @ApiProperty({ default: true, name: 'is_featured' })
  @IsBoolean()
  readonly isFeatured: boolean;

  @ApiProperty({ enum: ['taxable', 'none'], default: 'none' })
  @IsEnum(ProductTaxStatus)
  readonly taxStatus: ProductTaxStatus;
 
  @IsArray()
  @ApiProperty({ default: [1,2,3] })
  readonly categoryKeys : number[] ;
}

export class CreateProductDto extends ProductReqDto {

  @IsNumber()
  @ApiProperty({ required : false })
   id: number;


  @ApiProperty({
    default: [
      {
        lang: 'eng',
        name: 'apple',
        description: 'apple is a fruit',
        shortDescription: 'apple fruit',
        slug: 'apple',
      },
    ],
  })
  readonly productDetailsDto: CreateProductDetailDto[];
}

export class UpdateProductDto extends ProductReqDto {

  @IsNumber()
  @ApiProperty({ required : false })
    id: number;


  @ApiProperty({
    default: [
      {
        id : 1 ,
        lang: 'eng',
        name: 'apple',
        description: 'apple is a fruit',
        shortDescription: 'apple fruit',
        slug: 'apple',
      },
    ],
  })
  readonly updateProductDetailsDto: UpdateProductDetailDto[];
}
