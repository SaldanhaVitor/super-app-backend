import { Test, TestingModule } from '@nestjs/testing';
import { WishlistRepository } from './wishlist.repository';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../product/entities/product.entity';
import { WishlistService } from './wishlist.service';
import { ProductModule } from '../product/product.module';

describe('WishlistRepository', () => {
  let repository: WishlistRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      providers: [WishlistService, WishlistRepository],
    }).compile();

    repository = module.get<WishlistRepository>(WishlistRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save wishlist', async () => {
      const clientId = uuidv4();
      const wishlist = await repository.save(clientId);
      expect(wishlist).toBeDefined();
    });
  });

  describe('addProductToWishlist', () => {
    it('should add product to wishlist', async () => {
      const clientId = uuidv4();
      const wishlist = await repository.save(clientId);
      const product: Product = {
        id: uuidv4(),
        image: 'any_image',
        review: 5,
        price: 1.99,
        title: 'any_title',
      };
      const wishlistWithProduct = await repository.addProduct(
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
      await repository.save(clientId);
      const wishlistFound = await repository.findByClientId(clientId);
      expect(wishlistFound).toBeDefined();
    });
  });
});
