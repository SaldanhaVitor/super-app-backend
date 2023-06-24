import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapterService } from './axios-adapter.service';

describe('AxiosAdapterService', () => {
  let service: AxiosAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosAdapterService],
    }).compile();

    service = module.get<AxiosAdapterService>(AxiosAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
