import { registerEnumType } from "@nestjs/graphql";

export enum typeProductAttribute {
    IMG = 'image',
}

registerEnumType(typeProductAttribute)