import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WISHLIST } from './__mocks__/create-wishlist.mock';
import WishlistAlreadyExistsException from './exception/wishlist-already-exists.exception';
import { WISHLIST_WITH_PRODUCT } from './__mocks__/wishlist-products';
import ProductAlreadyInWishlistException from './exception/product-already-in-wishlist.exception';
import WishlistNotFoundException from './exception/wishlist-not-found.exception';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { PRODUCT_FOUND } from '../product/__mocks__/product-found.mock';

const mockSaveWishlist = jest.fn();
const mockFindWishlistByClientId = jest.fn();
const mockAddProductToWishlist = jest.fn();
const mockGetProduct = jest.fn();

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          global: true,
          module: ProductModule,
          providers: [
            {
              provide: ProductService,
              useValue: {
                getProductById: mockGetProduct,
              },
            },
          ],
        },
      ],
      providers: [
        WishlistService,
        {
          provide: WishlistRepository,
          useValue: {
            save: mockSaveWishlist,
            findByClientId: mockFindWishlistByClientId,
            addProduct: mockAddProductToWishlist,
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
      mockFindWishlistByClientId.mockReturnValue(undefined);
      const createWishlistDto: CreateWishlistDto = {
        clientId,
      };
      const wishlist = await service.create(createWishlistDto);
      expect(wishlist).toBeDefined();
      expect(wishlist.id).toBeDefined();
      expect(wishlist.clientId).toBe(createWishlistDto.clientId);
      expect(mockSaveWishlist).toHaveBeenCalledTimes(1);
    });
    it('should throws when creating duplicated wishlist by clientId', async () => {
      mockFindWishlistByClientId.mockReturnValue(WISHLIST);
      const clientId = uuidv4();
      const createWishlistDto: CreateWishlistDto = {
        clientId,
      };
      await expect(service.create(createWishlistDto)).rejects.toThrow(
        WishlistAlreadyExistsException,
      );
      expect(mockFindWishlistByClientId).toHaveBeenCalledTimes(1);
      expect(mockSaveWishlist).toHaveBeenCalledTimes(0);
    });
  });

  describe('getWishlistByClientId', () => {
    it('should get wishlist by client Id', async () => {
      const clientId = uuidv4();
      mockFindWishlistByClientId.mockReturnValue(WISHLIST);
      const wishlist = await service.getWishlistByClientId(clientId);
      expect(wishlist).toBeDefined();
      expect(mockFindWishlistByClientId).toHaveBeenCalledTimes(1);
    });
  });

  describe('add product to wishlist', () => {
    it('should add a product', async () => {
      mockFindWishlistByClientId.mockReturnValue(WISHLIST);
      mockGetProduct.mockReturnValue(PRODUCT_FOUND);
      const clientId = uuidv4();
      mockAddProductToWishlist.mockReturnValue({
        ...WISHLIST_WITH_PRODUCT,
        clientId,
      });
      const productId = uuidv4();
      const wishlist = await service.addProductToWishlist(clientId, productId);
      expect(wishlist).toBeDefined();
      expect(wishlist.clientId).toBe(clientId);
      expect(mockFindWishlistByClientId).toHaveBeenCalledTimes(1);
      expect(mockAddProductToWishlist).toHaveBeenCalledTimes(1);
      expect(wishlist.products).toHaveLength(1);
    });
    it("shouldn't add a duplicated product to the wishlist", async () => {
      mockFindWishlistByClientId.mockReturnValue(WISHLIST_WITH_PRODUCT);
      const clientId = uuidv4();
      mockAddProductToWishlist.mockReturnValue({
        ...WISHLIST_WITH_PRODUCT,
        clientId,
      });
      const [existentProduct] = WISHLIST_WITH_PRODUCT.products;
      await expect(
        service.addProductToWishlist(clientId, existentProduct.id),
      ).rejects.toThrow(ProductAlreadyInWishlistException);
      expect(mockFindWishlistByClientId).toHaveBeenCalledTimes(1);
      expect(mockAddProductToWishlist).toHaveBeenCalledTimes(0);
    });
    it("should throws when wishlist doesn't exists", async () => {
      mockFindWishlistByClientId.mockReturnValue(undefined);
      const clientId = uuidv4();
      const productId = uuidv4();
      await expect(
        service.addProductToWishlist(clientId, productId),
      ).rejects.toThrow(WishlistNotFoundException);
      expect(mockFindWishlistByClientId).toHaveBeenCalledTimes(1);
      expect(mockAddProductToWishlist).toHaveBeenCalledTimes(0);
    });
  });
});
