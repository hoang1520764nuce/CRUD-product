import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { productController } from "./product.controller";
import { Product } from "./entities/product.entity";
import { productService } from "./product.service";
import { ProductDetail } from "src/product-details/entities/product-detail.entity";
import { ProductDetailsService } from "src/product-details/product-details.service";
@Module({
    controllers:[productController],
    providers:[productService,ProductDetailsService],
    imports:[TypeOrmModule.forFeature([Product,ProductDetail])],
    exports:[TypeOrmModule]
})
export class ProductModule {}