import { Module } from '@nestjs/common';
import { ProductVariantsService } from './services/product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductAttributeDetail } from './entities/product-attribute-datail.entity';
import { ProductAttributeTermDetail } from './entities/product-attribute-term-detail.entity';
import { ProductAttributeTerm } from './entities/product-attribute-term.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductToAttribute } from './entities/product-to-attribute.entity';
import { ProductToVariant } from './entities/product-to-variant.entity';
import { ProductVariantImage } from './entities/product-variant-image.entity';
import { File } from './entities/file.entity';

@Module({
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
  imports:[TypeOrmModule.forFeature([ProductToVariant,
    ProductVariant,
    ProductVariantImage,
    File,
    ProductToAttribute,
    ProductAttributeDetail,
    ProductAttributeTerm,
    ProductAttribute,
    ProductAttributeTermDetail,])],
  exports:[TypeOrmModule]
})
export class ProductVariantsModule {}
