import { IsEnum } from "class-validator";
import { IsBoolean } from 'class-validator';
import { ProductStatus, ProductTaxStatus, ProductType } from "../enums/product.enumtype";

export class updateProductDto {
    
    @IsEnum({enum: ProductType, require: true})
    readonly type: ProductType 

    @IsEnum({enum: ProductStatus, require: true})
    readonly status:ProductStatus

   @IsBoolean()
    readonly isFeatured:boolean

  
    @IsEnum({enum: ProductTaxStatus, require: true})
    readonly taxStatus:ProductTaxStatus 
}