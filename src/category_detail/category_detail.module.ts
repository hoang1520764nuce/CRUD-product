import { Module } from '@nestjs/common';
import { CategoryDetailService } from './category_detail.service';
import { CategoryDetailController } from './category_detail.controller';

@Module({
  controllers: [CategoryDetailController],
  providers: [CategoryDetailService]
})
export class CategoryDetailModule {}
