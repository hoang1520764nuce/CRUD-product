import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class deleteListProductVariantDto {
    @IsNumber()
    @IsArray()
    @ApiProperty({ default: [1,2,3] })
    ids:number[]
}