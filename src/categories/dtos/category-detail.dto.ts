import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { langCategoryDetailEnum } from "../enums/category-detail.enum";

export class CategoryDetailReqDto {

    @IsString()
    categoryKey : string

    @IsString()
    lang : langCategoryDetailEnum;

    @IsString() 
    desc : string

    @IsString()  
    name : string

    @IsString()
    slug : string
    }   