import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class deleteListProductVariantDto {
    @IsString({ each: true })
    @IsArray()
    @ApiProperty({type : [String] , name: 'ids', default: ['1', '2', '3'] })
    ids:[]
}