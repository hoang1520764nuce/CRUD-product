import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Patch, Put } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { CategoryService } from './category.service';
import { CategoryPagenationDto } from './dtos/category-pagenation.dto';
import {
  CreateCategoryReqDto,
  UpdateCategoryReqDto,
} from './dtos/category.dto';
import { deleteListCategoryRepDto } from './dtos/delete-list-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('createCategory')
  create(@Body() createCategoryDto: CreateCategoryReqDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('getAllCategory')
  @PaginationResponse(Category)
  findAll(@Query() query: CategoryPagenationDto) {
    return this.categoryService.findAll(query);
  }

  @Get('getOneCategory:key')
  findOne(@Param('key') key: number) {
    return this.categoryService.findById(key);
  }

  @Put('updateCategoryByKey')
  update(
    @Body() updateCategoryDto: UpdateCategoryReqDto,
  ) {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Delete('deleteCategory:key')
  remove(@Param('key') key: number) {
    return this.categoryService.deleteCategory(key);
  }

  @Delete('deleteListCategory')
  removeList(@Body() dto: deleteListCategoryRepDto) {
    return this.categoryService.deleteListCategory(dto);
  }
}
