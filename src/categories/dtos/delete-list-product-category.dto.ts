import { IsArray, IsString } from 'class-validator';

export class deleteListProductCategoryRepDto {
  @IsString()
  categoryKey: string;

  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}
