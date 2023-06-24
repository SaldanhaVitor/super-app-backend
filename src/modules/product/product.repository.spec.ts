import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepository],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
