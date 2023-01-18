import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class deleteListProductAttributeDto {
    @IsNumber()
    @IsArray()
    @ApiProperty({default: [1,2,3] })
    keys : number[]
}