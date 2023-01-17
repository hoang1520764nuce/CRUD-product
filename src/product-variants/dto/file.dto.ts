import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsEnum, IsArray } from "class-validator";
import { FileEnum } from "../enums/file.enum";

export class createFileDto {
  @IsNumber()
  @ApiProperty({ default: 1 })
  key: number;

  @IsString()
  @ApiProperty({ default: 'url' })
  url: string;

  @IsEnum(FileEnum)
  @ApiProperty({ enum: ['png','jpg','jpeg','gif','svg'], default: 'png' })
  type : FileEnum

  @IsNumber()
  @ApiProperty({ default: 0 })
  size: number;
  
  @IsArray()
  @ApiProperty({ default: '1' })
  uploaderId: number;
}