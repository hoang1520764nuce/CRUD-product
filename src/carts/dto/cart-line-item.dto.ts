import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateCartLineItemDto {
    @ApiProperty({default : 1})
    @IsNumber()
    cartId: number;

    @ApiProperty( {default : 1})
    @IsNumber()
    productId: number;
}

export class UpdateCartLineItemDto  extends CreateCartLineItemDto{
    @ApiProperty({required: false})
    @IsNumber()
    id: number;

    
}