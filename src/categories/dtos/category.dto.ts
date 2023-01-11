import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { CreateCategoryDetailReqDto } from './category-detail.dto';
export class CreateCategoryReqDto {
   

    @ApiProperty( { type : [CreateCategoryDetailReqDto] , isArray : true ,default: {
        "category_key": "1",
        "lang": "eng",
        "desc": "homethings",
        "name": "fan",
        "slug": "1"
    } })
    @IsObject( { each : true})
    createCategoryDetailReqDto : CreateCategoryDetailReqDto[] ;
}



export class UpdateCategoryReqDto extends PartialType(CreateCategoryReqDto) {}