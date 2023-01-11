import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryReqDto } from './dtos/category.dto';
import { CategoryDetail } from './entities/category-detail.entity';
import { Category } from './entities/category.entity';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(CategoryDetail)
    private categoryDetailRepository: Repository<CategoryDetail>,
  ) {}

  async createCategory(dto: CreateCategoryReqDto) {
    const { createCategoryDetailReqDto } = dto;
    //const category = this.categoryRepository.save();
  }
}
