import { Test, TestingModule } from '@nestjs/testing';
import { ProductDetailController } from './product_detail.controller';
import { ProductDetailService } from './product_detail.service';

describe('ProductDetailController', () => {
  let controller: ProductDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDetailController],
      providers: [ProductDetailService],
    }).compile();

    controller = module.get<ProductDetailController>(ProductDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
