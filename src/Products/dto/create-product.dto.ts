import { ProductStatus, ProductType, TaxStatus } from "../enums/product.enumtype";

export class CreateProductDto {
    readonly type:ProductType
    readonly status:ProductStatus
    readonly is_featured:boolean
    readonly tax_status:TaxStatus 
}