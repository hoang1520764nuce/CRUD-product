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
import { CreateProductDto } from './dtos/create-product.dto';
import { updateProductDto } from './dtos/update-product.dto';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { Product } from './entities/product.entity';
import { ProductPagenationDto } from './dtos/product-pagenation.dto';
import { DeleteListProductReqDto } from './dtos/delete-list-product.dto';
@Controller('product')
export class productController {
  constructor(private productService: productService) {}

  @Post('createProduct')
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productService.createProduct(body);
    return product;
  }

  @Get('getAllProduct')
  @PaginationResponse(Product)
  getAll(@Query() query: ProductPagenationDto) {
    return this.productService.findAll(query);
  }

  @Get('getBy:id')
  getOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Put('updateProductBy:id')
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Delete('RemoveProductBy:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.softDeleteProduct(id);
  }

  @Delete('removeListProduct')
  deleteListProduct(@Body() body: DeleteListProductReqDto) {
    return this.productService.softDeleteListProduct(body);
  }
}
