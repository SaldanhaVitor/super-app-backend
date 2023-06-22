import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';

describe('WishlistController', () => {
  let controller: WishlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [WishlistService, WishlistRepository],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
