import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class deleteListProductAttributetDto {
    @IsNumber()
    @IsArray()
    @ApiProperty({default: [1,2,3] })
    keys : number[]
}