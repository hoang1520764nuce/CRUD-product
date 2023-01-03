import { Body, Controller, Delete, Get,Param,Post, Put } from "@nestjs/common/decorators";
import { productService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { updateProductDto } from "./dto/update-product.dto";
@Controller('product')
export class productController{
   constructor(private productService:productService){

   } 

    @Post() 
    createProduct(@Body() body: CreateProductDto){
        return this.productService.createProduct(body);
    }

    @Get()
    getAll(){
        return this.productService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.productService.findOne(id);
    }

    @Put(':id')
    updateProduct(@Param('id') id:string,@Body() body : updateProductDto){
        return this.productService.updateProduct(id,body);
    }
    
    @Delete(':id')
    deleteProduct(@Param('id') id : string )
    {
        return this.productService.softDeleteProduct(id);
    }
  
}