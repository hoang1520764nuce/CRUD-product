import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common/decorators';
import { productService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { Product } from './entities/product.entity';
import { ProductPagenationDto } from './dto/product-pagenation.dto';
@Controller('product')
export class productController {
  constructor(private productService: productService) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productService.createProduct(body);
    return product;
  }

  @Get()
  @PaginationResponse(Product)
  getAll(@Query() query: ProductPagenationDto) {
    return this.productService.findAll(query);
  }

  
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }


  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.softDeleteProduct(id);
  }
}
