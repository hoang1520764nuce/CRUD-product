import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "src/product_categories/entities/product_category.entity";
import { ProductDetail } from "src/product_details/entities/product_detail.entity";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@Injectable()
export class productService {
        
        constructor(
            @InjectRepository(Product)
            private employeeRepository : Repository<Product>){}

            findAll():Promise<Product[]>{
                return this.employeeRepository.find();
            }

            findOne(id:ProductCategory|ProductDetail):Promise<Product>{
                return this.employeeRepository.findOne(id);
            }
            // return 
        }
