import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNumber } from "class-validator";
import { langEnum } from "src/common/enums/lang.enum";

export class ProductAttributeTermDetailDto {

    @IsNumber()
    @ApiProperty({ default : 1 })
    productAttributeTermId : number;

    @IsEnum(langEnum)
    @ApiProperty({ enum: ['eng', 'vn'], default: 'eng' })
    lang : langEnum;

    @IsNumber()
    @ApiProperty({ default : 1 })
    value : number
}