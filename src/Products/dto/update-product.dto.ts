import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { IsBoolean } from 'class-validator';
import { UpdateProductDetailDto } from "src/product-details/dto/update-product-detail.dto";
import { ProductStatus, ProductTaxStatus, ProductType } from "../enums/product.enumtype";

export class updateProductDto {
    
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

    readonly updateProductDetailDto : UpdateProductDetailDto[];
}