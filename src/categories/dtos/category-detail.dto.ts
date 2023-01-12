import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { langCategoryDetailEnum } from "../enums/category-detail.enum";

export class CategoryDetailReqDto {

    @IsString( )
    categoryKey : string

    @IsEnum(langCategoryDetailEnum)
    lang : langCategoryDetailEnum;

    @IsString() 
    desc : string

    @IsString()  
    name : string

    @IsString()
    slug : string
    }   