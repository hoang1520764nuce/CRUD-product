import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import {  UpdateCartLineItemDto } from "./cart-line-item.dto";

export class UpdateCartDto {
   
    @IsNumber()
    @ApiProperty({
        default : 1,
    })
    id : number;

    @ApiProperty(
        {default : 
        [
            {
                "id": 1,
                "cartId": 1,
                "productId": 1
            }
        ]    
        }
    )
    cartLineItemsDto : UpdateCartLineItemDto[]
}
