import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { PRODUCT_FOUND } from './__mocks__/product-found.mock';
import { HttpClientModule } from '../shared/http-client/http-client.module';
import { HttpClientService } from '../shared/http-client/http-client.service';
import ProductGenericException from './exceptions/product-generic-error.exception';

const mockEndpointGet = jest.fn();

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          global: true,
          module: HttpClientModule,
          providers: [
            {
              provide: HttpClientService,
              useValue: {
                get: mockEndpointGet,
              },
            },
          ],
        },
      ],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get product by id', () => {
    it('should get product by id', async () => {
      mockEndpointGet.mockReturnValue(PRODUCT_FOUND);
      const productId = uuidv4();
      const product: Product = await service.getProductById(productId);
      expect(product).toBeDefined();
      expect(mockEndpointGet).toHaveBeenCalledTimes(1);
    });
    it('should trows when product is not found', async () => {
      mockEndpointGet.mockRejectedValue({
        message: 'Product not found',
        response: { status: 404 },
      });
      const productId = uuidv4();
      await expect(service.getProductById(productId)).rejects.toThrow(
        ProductGenericException,
      );
      expect(mockEndpointGet).toHaveBeenCalledTimes(1);
    });
  });
});
