import { registerEnumType } from "@nestjs/graphql";

export enum ProductDetailsLanguage {
    ENGLISH = 'english',
    SPANISH = 'spanish',
    FRENCH = 'french',
    GERMAN = 'german',
}

registerEnumType(ProductDetailsLanguage, {
    name: 'ProductDetailsLanguage',
  });   