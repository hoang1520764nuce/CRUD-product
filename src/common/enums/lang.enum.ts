import { registerEnumType } from "@nestjs/graphql"

export enum langEnum {
  ENG = 'eng',
  VN = 'vn',
}

registerEnumType(langEnum)

