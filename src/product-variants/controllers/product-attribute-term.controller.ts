import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post , Get , Put, Delete, Query, Param } from '@nestjs/common';


import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { ProductAttributeTermService } from '../services/product-attribute-term.service';
import { CreateProductAttributeTermDto, UpdateProductAttributeTermDto } from '../dto/product-attribute-term.dto';
import { ProductAttributeTerm } from '../entities/product-attribute-term.entity';
import { ProductAttributeTermPagenationDto } from '../dto/product-attribute-term-pagenation.dto';
import { deleteListProductAttributeTermDto } from '../dto/delete-list-product-attribute-term-detail.dto';


@Controller('product-attribute-term')
@ApiTags('product-attribute-term')
export class ProductAttributeTermController {
constructor(
    private productAttributeTermService : ProductAttributeTermService
) {}

    @Post()
    createProductAttributeTerm(@Body() body : CreateProductAttributeTermDto){
        return this.productAttributeTermService.createProductAttributeTerm(body) ;
    }

    @Get()
    @PaginationResponse(ProductAttributeTerm)
    getAllProductAttributeTerm(@Query() query : ProductAttributeTermPagenationDto){
        return this.productAttributeTermService.findAll(query);
    }

    @Get(':id')
    getProductAttributeTermById(@Param('id') id : number){
        return this.productAttributeTermService.findOne(id);
    }

    @Put(':id')
    updateProductAttributeTerm(@Param('id') id : number , @Body() body : UpdateProductAttributeTermDto){
        return this.productAttributeTermService.updateProductAttributeTerm(id , body);
    }

    @Delete(':id')
    deleteProductAttributeTerm(@Param('id') id : number){
        return this.productAttributeTermService.deleteProductAttributeTerm(id);
    }

    @Delete()
    deleteListProductAttributeTerm(@Body() body : deleteListProductAttributeTermDto ){
        return this.productAttributeTermService.deleteListProductAttributeTermDetail(body);
    }

}