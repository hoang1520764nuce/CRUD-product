import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { ProductPagenationDto } from 'src/products/dto/product-pagenation.dto';

@Controller('product-details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  // @Post()
  // create(@Body() createProductDetailDto: CreateProductDetailDto) {
  //   return this.productDetailsService.create(createProductDetailDto);
  // }

  @Get()
  @PaginationResponse(ProductDetail)
  findAll(@Query() query: ProductPagenationDto) {
    return this.productDetailsService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    
    return this.productDetailsService.update(+id, updateProductDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailsService.remove(+id);
  }
}
