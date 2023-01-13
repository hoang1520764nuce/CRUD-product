import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { CategoryService } from './category.service';
import { CategoryPagenationDto } from './dtos/category-pagenation.dto';
import { CreateCategoryReqDto, UpdateCategoryReqDto } from './dtos/category.dto';
import { deleteListCategoryRepDto } from './dtos/delete-list-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
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
  findOne(@Param('key') key: string) {
    return this.categoryService.findById(key);
  }

  @Patch('updateCategory:key')
  update(
    @Param('key') key: string,
    @Body() updateCategoryDto: UpdateCategoryReqDto,
  ) {
    return this.categoryService.updateCategory(key, updateCategoryDto);
  }

  @Delete('deleteCategory:key')
  remove(@Param('key') key: string) {
    return this.categoryService.deleteCategory(key);
  }

  @Delete('deleteListCategory')
  removeList(@Body() dto : deleteListCategoryRepDto)
  {
    return this.categoryService.deleteListCategory( dto );
  }
}
