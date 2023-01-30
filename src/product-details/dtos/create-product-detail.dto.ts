import { IsEnum, IsNumber, IsString } from "class-validator"
import { ProductDetailsLanguage } from "../enums/product-details.enum"

export class CreateProductDetailDto {
    
    @IsNumber()
    productId: number 

    @IsEnum( ProductDetailsLanguage )
    lang:ProductDetailsLanguage

   @IsString()
    name: string

   @IsString()
    description: string

    @IsString()
    shortDescription: string

   @IsString()
    slug:string

}
