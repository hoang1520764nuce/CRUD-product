import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryDetail } from './entities/category-detail.entity';



@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports : [TypeOrmModule.forFeature([Category, CategoryDetail])],
  exports : [TypeOrmModule,CategoryService]
})
export class CategoryModule {}
