import { PartialType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { langEnum } from "src/common/enums/lang.enum";

export class ProductAttributeDetailDto {

    @IsEnum(langEnum)
    @ApiProperty({ enum: ['eng', 'vn'], default: 'eng' })
    lang: langEnum;

    @IsString()
    @ApiProperty({ default: 'name' })
    name: string;

    @IsString()
    @ApiProperty({ default: 'slug' })
    slug: string;

    @IsString()
    @ApiProperty({ default: 'description' })
    description: string;
}

export class UpdateProductAttributeDetailDto extends  ProductAttributeDetailDto{

    @IsNumber()
    @ApiProperty({ default: 1 , required : false})
    id: number;
}