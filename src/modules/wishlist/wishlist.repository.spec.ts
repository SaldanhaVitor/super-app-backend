import { Test, TestingModule } from '@nestjs/testing';
import { WishlistRepository } from './wishlist.repository';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './entities/wishlist.entity';
import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  let service: WishlistRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistService, WishlistRepository],
    }).compile();

    service = module.get<WishlistRepository>(WishlistRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should save wishlist', async () => {
      const clientId = uuidv4();
      const wishlist = await service.save(clientId);
      expect(wishlist).toBeDefined();
    });
  });

  describe('addProductToWishlist', () => {
    it('should add product to wishlist', async () => {
      const clientId = uuidv4();
      const wishlist = await service.save(clientId);
      const product: Product = {
        id: uuidv4(),
        image: 'any_image',
        review: 5,
        price: 1.99,
        title: 'any_title',
      };
      const wishlistWithProduct = await service.addProduct(
        wishlist.id,
        product,
      );
      expect(wishlistWithProduct).toBeDefined();
      expect(wishlistWithProduct.products).toHaveLength(1);
    });
  });

  describe('findByClientId', () => {
    it('should find whislist by clientId', async () => {
      const clientId = uuidv4();
      await service.save(clientId);
      const wishlistFound = await service.findByClientId(clientId);
      expect(wishlistFound).toBeDefined();
    });
  });
});
