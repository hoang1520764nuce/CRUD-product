import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { productController } from "./product.controller";
import { Product } from "./entities/product.entity";
import { productService } from "./product.service";
@Module({
    controllers:[productController],
    providers:[productService],
    imports:[TypeOrmModule.forFeature([Product])],
    exports:[TypeOrmModule]
})
export class ProductModule {}