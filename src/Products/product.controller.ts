import { Controller, Get } from "@nestjs/common/decorators";
import { productService } from "./product.service";

@Controller('employee')
export class productController{
   constructor(private productService:productService){

   } 
    @Get()
    getAll(){
        return this.productService.findAll();
    }
}