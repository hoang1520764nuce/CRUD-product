import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import {  UpdateCartLineItemDto } from "./cart-line-item.dto";

export class UpdateCartDto {
    @ApiProperty()
    @IsNumber()
    user_id: number;

    @ApiProperty(
        {default : 
        [
            {
                "id": 1,
                "cart_id": 1,
                "product_id": 1
            }
        ]    
        }
    )
    cartLineItemsDto : UpdateCartLineItemDto[]
}
