import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductCategoryReqDto {
  @IsString()
  @ApiProperty({ default: '1', name: 'product_id' })
  productId: string;

  @IsString()
  @ApiProperty({ default: '1', name: 'category_key' })
  categoryKey: string;
}
