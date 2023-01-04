import { registerEnumType } from "@nestjs/graphql";

export enum ProductType {
    SIMPLE ='simple',
   CONFIGURABLLE = 'configurable'
  };

  registerEnumType(ProductType, {
    name: 'ProductType',
  });   

 export enum ProductTaxStatus {
   TAXABLE = 'taxable',
   NONE = 'none'
 } 

 registerEnumType(ProductTaxStatus, {
    name: 'TaxStatus',
  }); 

  export enum ProductStatus {
   DRAFT = 'draft',
   PUBLISH = 'publish',
   PENDING = 'pending',
   TRASH = 'trash'
  }

  registerEnumType(ProductStatus, {
    name: 'ProductStatus',
  });

