import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";


export  class DeleteListProductReqDto {
    @IsArray()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })   // run validita on each index
    @ApiProperty({ type: [String], default: ['1', '2', '3'] })
    ids:[] ;
}