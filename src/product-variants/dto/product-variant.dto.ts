import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
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
}

export class UpdateProductVariantDto 
 {
  @IsString()
  id: string;

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
}
