import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { ProductAttributeTermDetailDto } from "./product-attribute-term-detail.dto";

export class ProductAttributeTermDto {
    @IsNumber()
    @ApiProperty({ default : 1 })
    productAttributeKey : number;
}

export class CreateProductAttributeTermDto extends ProductAttributeTermDto {

    
    @ApiProperty({ type: [ProductAttributeTermDetailDto] , default :
    [
        {
            lang : 'eng',
            value: 1
        }
    ] })
    productAttributeTermDetails : ProductAttributeTermDetailDto[];
}

export class UpdateProductAttributeTermDto extends ProductAttributeTermDto  {
    @ApiProperty({ type: [ProductAttributeTermDetailDto] , default :
        [
            {   
                id : 1,
                lang : 'eng',
                value: 1
            }
        ] })
        updateProductAttributeTermDetailsDto : ProductAttributeTermDetailDto[];
}