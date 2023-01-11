import { registerEnumType } from '@nestjs/graphql';

export enum langCategoryDetailEnum {
  ENGLISH = 'eng',
  VIETNAM = 'vn',
}

registerEnumType(langCategoryDetailEnum, {
  name: 'langCategoryDetailEnum',
});
