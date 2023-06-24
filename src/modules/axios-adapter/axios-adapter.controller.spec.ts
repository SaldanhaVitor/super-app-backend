import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapterController } from './axios-adapter.controller';
import { AxiosAdapterService } from './axios-adapter.service';

describe('AxiosAdapterController', () => {
  let controller: AxiosAdapterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AxiosAdapterController],
      providers: [AxiosAdapterService],
    }).compile();

    controller = module.get<AxiosAdapterController>(AxiosAdapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
