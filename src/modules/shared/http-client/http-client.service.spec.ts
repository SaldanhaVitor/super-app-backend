import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from './http-client.service';
import { AxiosAdapterModule } from '../../../modules/axios-adapter/axios-adapter.module';
import { AxiosAdapter } from '../../../modules/axios-adapter/axios.adapter';
import { Constants } from '../../../configs';

const mockGetByAdapter = jest.fn();
describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          global: true,
          module: AxiosAdapterModule,
          providers: [
            {
              provide: AxiosAdapter,
              useValue: {
                get: mockGetByAdapter,
              },
            },
          ],
        },
      ],
      providers: [HttpClientService],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('Should call get by its adapter', async () => {
      mockGetByAdapter.mockReturnValue(undefined);
      await service.get(Constants.luizalabs.challengeApi);
      expect(mockGetByAdapter).toHaveBeenCalledTimes(1);
    });
    it('Should throws on error', async () => {
      mockGetByAdapter.mockRejectedValue(new Error());
      await expect(
        service.get(Constants.luizalabs.challengeApi),
      ).rejects.toThrow(new Error());
    });
  });
});
