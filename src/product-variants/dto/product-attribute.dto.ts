import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { langEnum } from "src/common/enums/lang.enum";
import { typeProductAttribute } from "../enums/product-attribute-type.enum";
import { ProductAttributeDetailDto } from "./product-attribute-detail.dto";

export class CreateProductAttributeDto {

    @IsEnum(typeProductAttribute)
    @ApiProperty({ enum: ['image', 'color'], default: 'image' })
    type: typeProductAttribute;

    @IsBoolean()
    @ApiProperty({ default: true })
    hasAchives : boolean

    // @IsNumber()
    // @ApiProperty({ default: 1 })
    // productAttributeId : number

    @ApiProperty({ type: [ProductAttributeDetailDto] , 
    default : [{
        lang: 'eng',
        name: 'name',
        slug: 'slug',
        description: 'description'
    }] }) 
    productAttributeDetails : ProductAttributeDetailDto[]
}

export class UpdateProductAttributeDto  extends CreateProductAttributeDto{ 

}