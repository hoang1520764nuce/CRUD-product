import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateCartLineItemDto } from "./cart-line-item.dto";

export class CreateCartDto {
   
    @ApiProperty(
        {default : 
        [
            {
               
                "cartId": 1,
                "productId": 1
            }
        ]    
        }
    )
    cartLineItemsDto : CreateCartLineItemDto[]
}
