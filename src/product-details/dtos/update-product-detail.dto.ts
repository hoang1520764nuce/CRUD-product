import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateProductDetailDto } from './create-product-detail.dto';

export class UpdateProductDetailDto extends PartialType(CreateProductDetailDto) {
    @IsNumber()
    @ApiProperty( { default : 1 , required : false})
    id: number;

}
