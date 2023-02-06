import { CartLineItem } from 'src/carts/entities/cart-line-item.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { CategoryDetail } from 'src/categories/entities/category-detail.entity';
import { Category } from 'src/categories/entities/category.entity';
import { ProductDetail } from 'src/product-details/entities/product-detail.entity';
import { ProductAttributeDetail } from 'src/product-variants/entities/product-attribute-datail.entity';
import { ProductAttributeTermDetail } from 'src/product-variants/entities/product-attribute-term-detail.entity';
import { ProductAttributeTerm } from 'src/product-variants/entities/product-attribute-term.entity';
import { ProductAttribute } from 'src/product-variants/entities/product-attribute.entity';
import { ProductToAttribute } from 'src/product-variants/entities/product-to-attribute.entity';
import { ProductToVariant } from 'src/product-variants/entities/product-to-variant.entity';
import { ProductVariantImage } from 'src/product-variants/entities/product-variant-image.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { ProductCategory } from 'src/Products/entities/product-category.entity';
import { Product } from 'src/products/entities/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { File } from 'src/product-variants/entities/file.entity';
export let dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '123123',
  database: 'product',
  synchronize: false,
  migrationsRun: true,
  entities: [
    Product,
    ProductDetail,
    Category,
    CategoryDetail,
    ProductCategory,
    ProductToVariant,
    ProductVariant,
    ProductVariantImage,
    File,
    ProductToAttribute,
    ProductAttributeDetail,
    ProductAttributeTerm,
    ProductAttribute,
    ProductAttributeTermDetail,
    Cart,
    CartLineItem
  ],

  migrations: ['dist/migrations/*.js'],
  
  
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
