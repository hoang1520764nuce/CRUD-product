import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post , Get , Put, Delete, Query, Param } from '@nestjs/common';
import { ProductAttributeService } from '../services/product-attribute.service';
import { CreateProductAttributeDto, UpdateProductAttributeDto } from '../dto/product-attribute.dto';

import { ProductAttribute } from '../entities/product-attribute.entity';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { deleteListProductAttributetDto } from '../dto/delete-list-product-attribute.dto';


@Controller('product-attribute')
@ApiTags('product-attribute')
export class ProductAttributeController {
constructor(
    private productAttributeService : ProductAttributeService
) {}

    @Post()
    createProductAttribute(@Body() body : CreateProductAttributeDto){
        return this.productAttributeService.createProductAttribute(body) ;
    }

    @Get()
    @PaginationResponse(ProductAttribute)
    getAllProductAttribute(@Query() query){
        return this.productAttributeService.findAll(query);
    }

    @Get(':key')
    getProductAttributeByKey(@Param('key') key : number){
        return this.productAttributeService.findOne(key);
    }

    @Put(':key')
    updateProductAttribute(@Param('key') key : number , @Body() body : UpdateProductAttributeDto){
        return this.productAttributeService.updateProductAttribute(key , body);
    }

    @Delete(':key')
    deleteProductAttribute(@Param('key') key : number){
        return this.productAttributeService.softRemove(key);
    }

    @Delete()
    deleteListProductAttribute(@Body() body : deleteListProductAttributetDto){
        return this.productAttributeService.softListRemove(body);
    }

}