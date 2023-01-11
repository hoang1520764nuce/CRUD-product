import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProductCategoryReqDto {
    @IsString()
    @ApiProperty({name : 'category_key' , default : '1'})
    categoryKey : string;

    @IsString()
    @ApiProperty({name : 'product_id' , default : '1'})
    productId : string;
}