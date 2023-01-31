import { BaseEntity } from "src/common/entities/base.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({name : 'cart_line_item'})
export class CartLineItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : 'cart_id'})
    cartId: number;

    @Column( {name : 'product_id'})
    productId: number;

    //join cart
    @ManyToOne( () => Cart, cart => cart.cartLineItems )
    @JoinColumn( { name :'cart_id' })
    cart: Cart;

    //join product
    @ManyToOne( () => Product, product => product.cartLineItems )
    @JoinColumn( { name :'product_id' })
    product: Product;
}
