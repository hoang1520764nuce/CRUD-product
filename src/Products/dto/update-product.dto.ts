import { ProductStatus, ProductType, TaxStatus } from "../enums/product.enumtype";

export class updateProductDto {
   
    type:ProductType;
    status : ProductStatus;
    is_featured: boolean;
    tax_status : TaxStatus
}