import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistService, WishlistRepository],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
