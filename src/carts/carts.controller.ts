import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post(':user_id')
  create(@Body() body: CreateCartDto ,
   @Param('user_id') userId : number) {
    console.log(userId);
    console.log(body);
    return this.cartsService.create(body, userId);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartsService.findOne(id);
  }

  @Put(':userId')
  update(@Param('userId') userId: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(userId, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
