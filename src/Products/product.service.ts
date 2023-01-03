import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";
import { ProductCategory } from "src/product_categories/entities/product_category.entity";
import { ProductDetail } from "src/product_details/entities/product_detail.entity";
import { Repository } from "typeorm";
import { updateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class productService {
        
        constructor(
            @InjectRepository(Product)
            private productRepository : Repository<Product>){}

          async  createProduct(CreateProductDto: CreateCategoryDto)
          {
            return await this.productRepository.save(CreateProductDto);
          };

          async updateProduct(  id  :   string ,   updateProductDto : updateProductDto  ){
       
            return await this.productRepository.update({id},updateProductDto);
                // {type: updateProductDto.type,
                //     status :updateProductDto.status,
                //     is_featured : updateProductDto.is_featured,
                //     tax_status : updateProductDto.tax_status
                // });
             
          };

          async softDeleteProduct(id:string){
                return await this.productRepository.softDelete(id);
          };


          async  findAll():Promise<Product[]>{
                return  await this.productRepository.find();
            };

            async findOne(id:string){
                const product = await this.productRepository.findOne({
                    where : {id},
                });
                return product;
            };
           
        }
