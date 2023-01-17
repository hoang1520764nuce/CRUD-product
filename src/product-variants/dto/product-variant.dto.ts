import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsArray, IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { FileEnum } from '../enums/file.enum';
export class CreateProductVariantDto {
  @IsNumber()
  @ApiProperty({ name: 'price', default: 1000 })
  price: number;

  @IsString()
  @ApiProperty({ name: 'sku', default: 'sku-1' })
  sku: string;

  @IsNumber()
  @ApiProperty({ name: 'quantity', default: 100 })
  quantity: number;

  @IsNumber()
  @ApiProperty({ default: 1000    })
  salePrice: number;

  @IsBoolean()
  @ApiProperty({  default: false  })
  onSale: boolean;

  @IsNumber( )
  @ApiProperty({ default: [1] })
  productIds: number[];

  @IsNumber()
  @ApiProperty({ default: [1] })
  fileIds : number[]
}

export class UpdateProductVariantDto  extends CreateProductVariantDto
 {
  // @IsString()
  // id: string;

  // @IsNumber()
  // @ApiProperty({ name: 'price', default: 1000 })
  // price: number;

  // @IsString()
  // @ApiProperty({ name: 'sku', default: 'sku-1' })
  // sku: string;

  // @IsNumber()
  // @ApiProperty({ name: 'quantity', default: 100 })
  // quantity: number;

  // @IsNumber()
  // @ApiProperty({ default: 1000    })
  // salePrice: number;

  // @IsBoolean()
  // @ApiProperty({  default: false  })
  // onSale: boolean;

  // @IsNumber()
  // @ApiProperty({  default: 1 })
  // productId: number;

  // @IsNumber()
  // @ApiProperty({ default: 1 })
  // fileKey: number;

  // @IsString()
  // @ApiProperty({ default: 'url' })
  // url: string;

  // @IsEnum(FileEnum)
  // type : FileEnum

  // @IsNumber()
  // @ApiProperty({ default: 1 })
  // size: number;
  
  // @IsArray()
  // @ApiProperty({ default: '1' })
  // uploaderId: number;
}
