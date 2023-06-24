import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapter } from './axios.adapter';

describe('AxiosAdapter', () => {
  let service: AxiosAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosAdapter],
    }).compile();

    service = module.get<AxiosAdapter>(AxiosAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
