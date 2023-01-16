import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductVariantsService } from './services/product-variants.service';
import { CreateProductVariantDto } from './dto/product-variant.dto';
import { UpdateProductVariantDto } from './dto/product-variant.dto';
import { ApiTags } from '@nestjs/swagger';
import { Put, Query } from '@nestjs/common/decorators';
import { deleteListProductVariantDto } from './dto/detele-list-product-variant.dto';
import { ProductVariant } from './entities/product-variant.entity';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { ProductVariantPagenationDto } from 'src/Products/dtos/product-variant-pagenation.dto';

@Controller('product-variants')
@ApiTags('product-variants')
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantsService.createProductVariant(
      createProductVariantDto,
    );
  }

  @Get()
  @PaginationResponse(ProductVariant)
  findAll(@Query() query: ProductVariantPagenationDto) {
    return this.productVariantsService.findAllProductVariants(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productVariantsService.findOneProductVariant(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantsService.updateProductVariant(
      id,
      updateProductVariantDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productVariantsService.deleteProductVariant(id);
  }

  @Delete()
  removeList(@Body() dto: deleteListProductVariantDto) {
    return this.productVariantsService.deleteListProductVariant(dto);
  }
}
