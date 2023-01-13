import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class deleteListCategoryRepDto  {
    @IsArray()
    @IsString( { each : true })
    @ApiProperty( { default :  [
        "1",
        "2",
        "3"
      ]} )
    categoryKeys: string[];
}