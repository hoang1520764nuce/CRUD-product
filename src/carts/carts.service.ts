import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartLineItem } from './entities/cart-line-item.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartLineItem)
    private cartLineItemRepository: Repository<CartLineItem>,
  ) {}

  @Transactional()
  async create(dto: CreateCartDto, userId: number) {
    const { cartLineItemsDto } = dto;

    const cart = this.cartRepository.create({
      userId: userId,
    });

    await this.cartRepository.save(cart);

    const cartLineItems = cartLineItemsDto.map( (inputed) => 
      this.cartLineItemRepository.create({
        cartId: cart.id,
        productId: inputed.productId,
      } )
    )

    await this.cartLineItemRepository.save(cartLineItems);
    cart.cartLineItems = cartLineItems ;
    return cart;
  }

  findAll() {
    const cart = this.cartRepository.find({
      relations : { cartLineItems : { product : true } } ,
    });
    return cart;
  }

  findOne(id: number) {
    const cart = this.cartRepository.find({
    //  where : {userId: id},
    //   // relation
    //   relations : { cartLineItems : { product : true } } ,

      relations: {
        cartLineItems : { product : true },
    },
    where: {
      userId: id,
    },
    })

    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
