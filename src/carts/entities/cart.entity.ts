import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartLineItem } from "./cart-line-item.entity";

@Entity({name : 'cart'})
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : ' user_id '})
    userId: number;

    //join cartLineItem
    @OneToMany( () => CartLineItem, cartLineItem => cartLineItem.cart )
    cartLineItems: CartLineItem[];
}
