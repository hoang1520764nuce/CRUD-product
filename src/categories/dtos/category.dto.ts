import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
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

export class UpdateCategoryReqDto extends PartialType(CreateCategoryReqDto) {}
