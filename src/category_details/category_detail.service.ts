import { Injectable } from '@nestjs/common';
import { CreateCategoryDetailDto } from './dto/create-category_detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category_detail.dto';

@Injectable()
export class CategoryDetailService {
  create(createCategoryDetailDto: CreateCategoryDetailDto) {
    return 'This action adds a new categoryDetail';
  }

  findAll() {
    return `This action returns all categoryDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryDetail`;
  }

  update(id: number, updateCategoryDetailDto: UpdateCategoryDetailDto) {
    return `This action updates a #${id} categoryDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryDetail`;
  }
}
