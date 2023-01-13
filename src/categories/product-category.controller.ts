// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Put,
//   Param,
//   Delete,
//   Query,
//   ValidationPipe,
// } from '@nestjs/common';
// import { Patch } from '@nestjs/common/decorators';
// import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
// import { CategoryService } from './category.service';
// import { deleteListProductCategoryRepDto } from './dtos/delete-list-product-category.dto';
// import { ProductCategoryPagenationDto } from './dtos/product-category-pagenation.dto';
// import { ProductCategoryReqDto } from './dtos/product-categoty.dto';
// import { ProductCategory } from './entities/product-category.entity';

// @Controller('productCategory')
// export class ProductCategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Post('createProductCategory')
//  async create(@Param('key') key: string , @Param('id') id : string) {
//   console.log(key);
//   console.log(id);
//     const productCategory = await this.categoryService.createProductCategory(key, id);
//     return productCategory;
//   }

//   @Get('getAllProductCategory')
//   @PaginationResponse(ProductCategory)
//   findAll(@Query() query: ProductCategoryPagenationDto) {
//     return this.categoryService.findAllProductCategory(query);
//   }

//   @Get('getOneProductByCategory:key')
//   findCategory(@Param('key') key: string) {
//     return this.categoryService.findOneProductCategory(key);
//   }

//   @Get('getOneCategoryByProduct:key')
//   findProduct(@Param('key') key: string) {
//     return this.categoryService.findOneCategoryProduct(key);
//   }

//   @Patch('updateCategory:key')
//   update(@Body() body: ProductCategoryReqDto) {
//     return this.categoryService.updateProductCategory(body);
//   }

//   @Delete('deleteProductCategory:key')
//   remove(@Body() body: ProductCategoryReqDto) {
//     return this.categoryService.deleteProductCategory(body);
//   }

//   @Delete('deleteListProductCategory')
//   removeList(@Body() dto: deleteListProductCategoryRepDto) {
//     return this.categoryService.deleteListProductCategory(dto);
//   }
// }
