import { registerEnumType } from "@nestjs/graphql";

export enum ProductType {
    'simple',
    'configurable'
  };

  registerEnumType(ProductType, {
    name: 'ProductType',
  });   

 export enum TaxStatus {
    'taxable',
    'none'
 } 

 registerEnumType(TaxStatus, {
    name: 'TaxStatus',
  }); 


