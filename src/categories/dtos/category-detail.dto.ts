import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDetailReqDto {

    @IsString()
    @ApiProperty( { name : 'category_key' , default : '1'})
    categoryKey : string

    @IsString()
    @ApiProperty( { name : 'lang' , default : 'eng'})
    lang : string

    @IsString()
    @ApiProperty( { name : 'desc' , default : 'homethings'})
    desc : string

    @IsString()
    @ApiProperty( { name : 'name' , default : 'fan'})
    name : string

    @IsString()
    @ApiProperty( { name : 'slug' , default : '1'})
    slug : string
    }   