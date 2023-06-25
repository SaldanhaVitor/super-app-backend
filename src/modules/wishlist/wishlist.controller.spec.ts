import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { v4 as uuidv4 } from 'uuid';
import { WISHLIST } from './__mocks__/create-wishlist.mock';
import { ProductModule } from '../product/product.module';

const mockGetByClientIdWishlistController = jest.fn();
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
            getWishlistByClientId: mockGetByClientIdWishlistController,
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
    it('should call getWishlistByClientId', async () => {
      mockGetByClientIdWishlistController.mockReturnValue(WISHLIST);
      const clientId = uuidv4();
      await controller.get(clientId);
      expect(mockGetByClientIdWishlistController).toHaveBeenCalledTimes(1);
    });
  });
});
