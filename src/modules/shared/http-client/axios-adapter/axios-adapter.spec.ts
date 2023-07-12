import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapter } from './axios.adapter';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Constants } from '../../../../configs';

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

  describe('get', () => {
    it('should call an url by http get', async () => {
      const mock = new MockAdapter(axios);
      const data = { response: true };
      mock.onGet(Constants.luizalabs.challengeApi).reply(200, data);
      const response = await service.get(Constants.luizalabs.challengeApi);
      expect(response).toBeDefined();
    });
  });
});
