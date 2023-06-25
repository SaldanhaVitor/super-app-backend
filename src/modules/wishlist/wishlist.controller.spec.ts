import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { v4 as uuidv4 } from 'uuid';
import { WISHLIST } from './__mocks__/create-wishlist.mock';
import { ProductModule } from '../product/product.module';

const mockCreateWishlistController = jest.fn();

describe('WishlistController', () => {
  let controller: WishlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      controllers: [WishlistController],
      providers: [
        {
          provide: WishlistService,
          useValue: {
            create: mockCreateWishlistController,
          },
        },
        WishlistRepository,
      ],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create', async () => {
      mockCreateWishlistController.mockReturnValue(WISHLIST);
      await controller.create({ clientId: uuidv4() });
      expect(mockCreateWishlistController).toHaveBeenCalledTimes(1);
    });
  });
});
