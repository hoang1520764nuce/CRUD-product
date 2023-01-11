import { IsArray, IsString } from "class-validator";

export class deleteListCategoryRepDto  {
    @IsArray()
    @IsString( { each : true })
    categoryKeys: string[];
}