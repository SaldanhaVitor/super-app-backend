import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const mockListProductsController = jest.fn();
describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            listProducts: mockListProductsController,
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get list products', () => {
    it('should list all products', async () => {
      mockListProductsController.mockReturnValue(undefined);
      const page = 1;
      await controller.findAll(page);
      expect(mockListProductsController).toHaveBeenCalledTimes(1);
    });
  });
});
