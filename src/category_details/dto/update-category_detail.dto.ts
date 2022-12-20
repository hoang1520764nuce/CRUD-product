import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDetailDto } from './create-category_detail.dto';

export class UpdateCategoryDetailDto extends PartialType(CreateCategoryDetailDto) {}
