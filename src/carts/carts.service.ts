import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { UpdateCartLineItemDto } from './dto/cart-line-item.dto';
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
      id: id,
    },
    })

    return cart;
  }
  
@Transactional()
 async update(userId: number, updateCartDto: UpdateCartDto) {
      const {id , cartLineItemsDto} = updateCartDto ;

      const exitsCart = await this.cartRepository.findOne({
        where : {id : id},
        relations : { cartLineItems :{product : true}  },
      });

          

        await this.cartRepository.update(id,{userId})

        await this.updateCartLineItem(cartLineItemsDto , exitsCart , exitsCart.cartLineItems);
  }

  private async updateCartLineItem(cartLineItemsDto : UpdateCartLineItemDto[] , 
    exitsCart : Cart ,
     exitsCartLineItems : CartLineItem[]) {

    const removeCartLineItems : number[] = [];
    const updateCartLineItems : Partial<CartLineItem>[] = [];
    const insertCartLineItems : CartLineItem[] = [];
    exitsCartLineItems.forEach(dataInDb =>
      {
        const isExitsInDto = cartLineItemsDto.some( dataInDto => dataInDto.id === dataInDb.id );

        if(!isExitsInDto) {
          removeCartLineItems.push(dataInDb.id);
        }
      }
       )

    cartLineItemsDto.forEach(dataInDto => {
      const isExitsInDb = exitsCartLineItems.some( dataInDb => dataInDto.id === dataInDb.id );

      if(!isExitsInDb) {
        insertCartLineItems.push(
          this.cartLineItemRepository.create({
            cartId: exitsCart.id,
            productId: dataInDto.productId,
          })
        )
      }
      else {
        updateCartLineItems.push(
          this.cartLineItemRepository.create({
            id: dataInDto.id,
            cartId: exitsCart.id,
            productId: dataInDto.productId,
          })
        )
      }})
      console.log('updateCartLineItems',updateCartLineItems);
      if (removeCartLineItems.length) {
        console.log('onif');
        await Promise.all([
          // delete
          this.cartLineItemRepository.softDelete(removeCartLineItems),
          // update
          ...updateCartLineItems.map((item) =>
            this.cartLineItemRepository.update(item.id, item),
          ),
          // insert
          this.cartLineItemRepository.save(insertCartLineItems),
        ]);
      } else {
        console.log('else'),
        await Promise.all([
          // update
          ...updateCartLineItems.map((item) => {
            this.cartLineItemRepository.update(item.id, item);
          }),
          // insert
          this.cartLineItemRepository.save(insertCartLineItems),
        ]);
      }
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
