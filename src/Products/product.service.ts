import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
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

            // return 

}