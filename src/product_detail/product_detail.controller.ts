import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Post()
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @Get()
  findAll() {
    return this.productDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDetailDto: UpdateProductDetailDto) {
    return this.productDetailService.update(+id, updateProductDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailService.remove(+id);
  }
}
