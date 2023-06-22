import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

const mockSaveWishlist = jest.fn();
describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        {
          provide: WishlistRepository,
          useValue: {
            save: mockSaveWishlist,
          },
        },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create wishlist', () => {
    it('should create a wishlist', async () => {
      const clientId = uuidv4();
      mockSaveWishlist.mockReturnValue({ id: uuidv4(), clientId });
      const createWishlistDto: CreateWishlistDto = {
        clientId,
      };
      const wishlist = await service.create(createWishlistDto);
      expect(wishlist).toBeDefined();
      expect(wishlist.id).toBeDefined();
      expect(wishlist.clientId).toBe(createWishlistDto.clientId);
      expect(mockSaveWishlist).toHaveBeenCalledTimes(1);
    });
  });
});
