import {PartialType} from '@nestjs/mapped-types';
import { CreateProductDetailDto } from './create-product_detail.dto';

export class UpdateProductDetailDto extends PartialType(CreateProductDetailDto) {}
