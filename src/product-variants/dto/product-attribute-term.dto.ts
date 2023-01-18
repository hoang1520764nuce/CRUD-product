import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { ProductAttributeTermDetailDto } from "./product-attribute-term-detail.dto";

export class CreateProductAttributeTermDto {

    @IsNumber()
    @ApiProperty({ default : 1 })
    productAttributeKey : number;

    @ApiProperty({ type: [ProductAttributeTermDetailDto] , default :
    [
        {
            lang : 'eng',
            value: 1
        }
    ] })
    productAttributeTermDetails : ProductAttributeTermDetailDto[];
}

export class UpdateProductAttributeTermDto extends CreateProductAttributeTermDto  {
   
}