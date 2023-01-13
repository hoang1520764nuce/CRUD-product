import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CategoryDetailReqDto } from './dtos/category-detail.dto';
import { CategoryPagenationDto } from './dtos/category-pagenation.dto';
import {
  CreateCategoryReqDto,
  UpdateCategoryReqDto,
} from './dtos/category.dto';
import { deleteListCategoryRepDto } from './dtos/delete-list-category.dto';
import { CategoryDetail } from './entities/category-detail.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(CategoryDetail)
    private categoryDetailRepository: Repository<CategoryDetail>,
  ) {}

  @Transactional()
  async createCategory(dto: CreateCategoryReqDto) {
    const { categoryDetailReqDto } = dto;
    const category = this.categoryRepository.create();
    await this.categoryRepository.save(category);

    const CategoryDetail = categoryDetailReqDto.map((inputed) =>
      this.categoryDetailRepository.create({
        categoryKey: category.key,
        lang: inputed.lang,
        desc: inputed.desc,
        name: inputed.name,
        slug: inputed.slug,
      }),
    );

    await this.categoryDetailRepository.save(CategoryDetail);
    category.categoryDetails = CategoryDetail;
    return category;
  }

  @Transactional()
  async updateCategory(categoryKey: string, dto: UpdateCategoryReqDto) {
    const { categoryDetailReqDto } = dto;
    const [existCategory] = await this.categoryRepository.find({
      where: { key: categoryKey },
      relations: { categoryDetails: true },
    });

    if (!existCategory)
      throw new HttpException('cannot find the category', HttpStatus.NOT_FOUND);
    else return this.updateCategoryDetail(existCategory, categoryDetailReqDto);
  }

  private async updateCategoryDetail(
    existCategory: Category,
    categoryDto: CategoryDetailReqDto[],
  ) {
    const removeCategoryDetail: CategoryDetailReqDto[] = [];
    existCategory.categoryDetails.forEach((categoryDetail) => {
      const findCategoryDetail = categoryDto.some(
        (inputed) => inputed.lang === categoryDetail.lang,
      );
      if (!findCategoryDetail) removeCategoryDetail.push(categoryDetail);
    });

    const updateCategory = categoryDto.map((inputFromDto) =>
      this.categoryDetailRepository.create({
        categoryKey: existCategory.key,
        lang: inputFromDto.lang,
        desc: inputFromDto.desc,
        name: inputFromDto.name,
        slug: inputFromDto.slug,
      }),
    );

    await this.categoryDetailRepository.softRemove(removeCategoryDetail);
    await this.categoryDetailRepository.save(updateCategory);
  }

  async findAll(dto: CategoryPagenationDto) {
    const page = dto.page;
    const limit = dto.limit;
    const CategoryQB = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryDetails', 'CategoryDetail');

    return paginate(CategoryQB, { limit, page });
  }

  async findById(key: string) {
    const [category] = await this.categoryRepository.find({
      where: { key: key },
      relations: { categoryDetails: true },
    });
    if (!category)
      throw new HttpException('cannot find the category', HttpStatus.NOT_FOUND);
    else return category;
  }

  @Transactional()
  async deleteCategory(key: string) {
    const [category] = await this.categoryRepository.find({
      where: { key },
      relations: { categoryDetails: true },
    });
    if (!category)
      throw new HttpException('cannot find the category', HttpStatus.NOT_FOUND);
    else await this.categoryRepository.softDelete(key);

    const [categoryDetail] = await this.categoryDetailRepository.find({
      where: { categoryKey: category.key },
    });

    if (!categoryDetail)
      throw new HttpException(
        'cannot find the categoryDetail',
        HttpStatus.NOT_FOUND,
      );
    else {
      await this.categoryDetailRepository.softRemove(categoryDetail);
    }
  }

  @Transactional()
  async deleteListCategory(dto: deleteListCategoryRepDto) {
    const { categoryKeys } = dto;
    const category = await this.categoryRepository.findBy({
      key: In(categoryKeys),
    });
    if (!category)
      throw new HttpException('cannot find the category', HttpStatus.NOT_FOUND);

    const categoryDetails = await this.categoryDetailRepository.findBy({
      categoryKey: In(categoryKeys),
    });

    await this.categoryRepository.softDelete(categoryKeys);
    await this.categoryDetailRepository.softRemove(categoryDetails);
  }
}
