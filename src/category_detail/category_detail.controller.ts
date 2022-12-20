import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryDetailService } from './category_detail.service';
import { CreateCategoryDetailDto } from './dto/create-category_detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category_detail.dto';

@Controller('category-detail')
export class CategoryDetailController {
  constructor(private readonly categoryDetailService: CategoryDetailService) {}

  @Post()
  create(@Body() createCategoryDetailDto: CreateCategoryDetailDto) {
    return this.categoryDetailService.create(createCategoryDetailDto);
  }

  @Get()
  findAll() {
    return this.categoryDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDetailDto: UpdateCategoryDetailDto) {
    return this.categoryDetailService.update(+id, updateCategoryDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryDetailService.remove(+id);
  }
}
