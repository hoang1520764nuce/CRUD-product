import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { CategoryDetailReqDto } from './category-detail.dto';
export class CreateCategoryReqDto {
  @ApiProperty({
    type: [CategoryDetailReqDto],
    isArray: true,
    default: [
      { 
        lang: 'eng',
        desc: 'homethings',
        name: 'fan',
        slug: '1',
      },
    ],
  })
  @IsObject({ each: true })
  categoryDetailReqDto: CategoryDetailReqDto[];
}

export class UpdateCategoryReqDto  {

  @ApiProperty({required : false})
  @IsNumber()
  key: number;

  @ApiProperty({
    type: [CategoryDetailReqDto],
    isArray: true,
    default: [
      {
        categoryKey : 1 ,
        lang: 'eng',
        desc: 'homethings',
        name: 'fan',
        slug: '1',
      },
    ],
  })
  @IsObject({ each: true })
  categoryDetailReqDto: CategoryDetailReqDto[];
}
