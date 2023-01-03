import { registerEnumType } from "@nestjs/graphql";

export enum ProductType {
    SIMPLE ='simple',
   CONFIGURABLLE = 'configurable'
  };

  registerEnumType(ProductType, {
    name: 'ProductType',
  });   

 export enum TaxStatus {
   TAXABLE = 'taxable',
   NONE = 'none'
 } 

 registerEnumType(TaxStatus, {
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

