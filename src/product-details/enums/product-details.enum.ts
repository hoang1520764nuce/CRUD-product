import { registerEnumType } from '@nestjs/graphql';

export enum ProductDetailsLanguage {
  ENGLISH = 'eng',
  VIETNAM = 'vn',
}

registerEnumType(ProductDetailsLanguage, {
  name: 'ProductDetailsLanguage',
});
