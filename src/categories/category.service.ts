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
  async updateCategory( dto: UpdateCategoryReqDto) {
    const { key ,categoryDetailReqDto } = dto;
    const [existCategory] = await this.categoryRepository.find({
      where: { key: key },
      relations: { categoryDetails: true },
    });

    if (!existCategory)
      throw new HttpException('cannot find the category', HttpStatus.NOT_FOUND);
    else return this.updateCategoryDetail(existCategory, existCategory.categoryDetails ,categoryDetailReqDto);
  }

  private async updateCategoryDetail(
    existCategory: Category,
    categoryDetails : CategoryDetail[],
    updateCategoryDetail: CategoryDetailReqDto[],
  ) {
     const removeCategoryDetails : number[] = [];
     const insertCategoryDetails : CategoryDetail[] = [] ;
     const updateCategoryDetails : Partial<CategoryDetail>[] = [] ;
     categoryDetails.forEach((dataInDb) => {
      const isExitsInDto = updateCategoryDetail.some((dataInDto) => {
        return dataInDb.categoryKey === dataInDto.categoryKey;
      });
      if (!isExitsInDto) {
        removeCategoryDetails.push(dataInDb.categoryKey);
      }
    });

    // if dto don't exits on db - insert
    updateCategoryDetail.forEach(async (dateInDto) => {
      const isExistInDB = existCategory.categoryDetails.some((dataInDb) => {
        return dateInDto.categoryKey === dataInDb.categoryKey;
      });

      const categoryDetail = this.categoryDetailRepository.findBy({
        categoryKey : existCategory.key,
      });
      if (!categoryDetail)
        throw new HttpException(
          'cannot find the Category detail',
          HttpStatus.NOT_FOUND,
        );

      if (!isExistInDB) {
        insertCategoryDetails.push(
          this.categoryDetailRepository.create({
            categoryKey: existCategory.key,
            lang: dateInDto.lang,
            desc: dateInDto.desc,
            name: dateInDto.name,
            slug: dateInDto.slug,

          }),
        );
      } else {
        updateCategoryDetails.push(
          this.categoryDetailRepository.create({
            categoryKey: existCategory.key,
            lang: dateInDto.lang,
            desc: dateInDto.desc,
            name: dateInDto.name,
            slug: dateInDto.slug,
          }),
        );
      }
    });
    console.log('updateCategoryDetail',updateCategoryDetail);
    console.log('insertCategoryDetails',insertCategoryDetails);
    console.log('updateCategoryDetails',updateCategoryDetails);
    // if user's input no change --> do Nothing
    console.log(removeCategoryDetails.length);
    console.log(updateCategoryDetails.length);
    if (removeCategoryDetails.length && updateCategoryDetails.length) {
      await Promise.all([
        // delete
        this.categoryDetailRepository.softDelete(removeCategoryDetails),
        // update
        console.log('update') ,
        ...updateCategoryDetail.map((item) =>
          this.categoryDetailRepository.update(item.categoryKey, item),
        ),
        // insert
        this.categoryDetailRepository.insert(insertCategoryDetails),
      ]);
    } else {
      await Promise.all([
        // insert
        this.categoryDetailRepository.insert(insertCategoryDetails),
      ]);
    }
   
     
  }

  async findAll(dto: CategoryPagenationDto) {
    const page = dto.page;
    const limit = dto.limit;
    const CategoryQB = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryDetails', 'CategoryDetail');

    return paginate(CategoryQB, { limit, page });
  }

  async findById(key: number) {
    const [category] = await this.categoryRepository.find({
      where: { key: key },
      relations: { categoryDetails: true },
    });
    if (!category)
      throw new HttpException('cannot find the category', HttpStatus.NOT_FOUND);
    else return category;
  }

  @Transactional()
  async deleteCategory(key: number) {
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
