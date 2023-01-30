import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { langEnum } from "src/common/enums/lang.enum";
import { typeProductAttribute } from "../enums/product-attribute-type.enum";
import { ProductAttributeDetailDto, UpdateProductAttributeDetailDto } from "./product-attribute-detail.dto";

export class ProductAttributeDto {
    @IsEnum(typeProductAttribute)
    @ApiProperty({ enum: ['image', 'color'], default: 'image' })
    type: typeProductAttribute;

    @IsBoolean()
    @ApiProperty({ default: true })
    hasAchives : boolean
}
export class CreateProductAttributeDto  extends ProductAttributeDto {

    

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

export class UpdateProductAttributeDto  extends ProductAttributeDto { 
    @IsNumber()
    @ApiProperty({ default: 1 , required : false})
    id: number;

    @ApiProperty({ type: [ProductAttributeDetailDto] , 
        default : [{
            id : 1,
            lang: 'eng',
            name: 'name',
            slug: 'slug',
            description: 'description'
        }] }) 
        updateProductAttributeDetails : UpdateProductAttributeDetailDto[]
    }
