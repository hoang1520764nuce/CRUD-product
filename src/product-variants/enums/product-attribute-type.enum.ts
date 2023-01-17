import { registerEnumType } from "@nestjs/graphql";

export enum typeProductAttribute {
    IMG = 'image',
    COLOR = 'color',
}

registerEnumType(typeProductAttribute)