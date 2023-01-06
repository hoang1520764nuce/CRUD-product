import { IsEnum } from 'class-validator';
import { IsBoolean } from 'class-validator';
import {
  ProductStatus,
  ProductTaxStatus,
  ProductType,
} from '../enums/product.enumtype';

export class CreateProductDto {
  @IsEnum(ProductType)
  readonly type: ProductType ;

  @IsEnum(ProductStatus)
  readonly status: ProductStatus;

  @IsBoolean()
  readonly isFeatured: boolean;

  @IsEnum(ProductTaxStatus)
  readonly taxStatus: ProductTaxStatus;
}
