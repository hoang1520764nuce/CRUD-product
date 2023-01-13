import { registerEnumType } from "@nestjs/graphql";

export enum FileEnum { 
      PNG = 'png'
    , JPG = 'jpg'
    , JPEG = 'jpeg'
    , GIF = 'gif'
    , SVG = 'svg'
}

registerEnumType(FileEnum)