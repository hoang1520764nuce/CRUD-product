import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class deleteListProductAttributeTermDto {
  @IsArray()
  @ApiProperty({ default: [1, 2, 3] })
  ids: number[];
}
