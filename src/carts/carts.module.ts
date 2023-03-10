import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Cart } from './entities/cart.entity';
import { CartLineItem } from './entities/cart-line-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports:[TypeOrmModule.forFeature([Cart,CartLineItem]) ],
  exports:[TypeOrmModule]
})
export class CartsModule {}
