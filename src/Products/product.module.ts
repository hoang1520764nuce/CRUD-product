import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { productController } from "./product.controller";
import { Product } from "./entities/product.entity";
import { productService } from "./product.service";
import { ProductDetail } from "src/product-details/entities/product-detail.entity";
import { ProductDetailsService } from "src/product-details/product-details.service";
import { ProductCategory } from "./entities/product-category.entity";
import { CategoryService } from "src/categories/category.service";
import { Category } from "src/categories/entities/category.entity";
import { CategoryModule } from "src/categories/category.module";
@Module({
    controllers:[productController],
    providers:[productService,ProductDetailsService,CategoryService],
    imports:[TypeOrmModule.forFeature([Product,ProductDetail,ProductCategory,Category]) , CategoryModule],
    exports:[TypeOrmModule]
})
export class ProductModule {}