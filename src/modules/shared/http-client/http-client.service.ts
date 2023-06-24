import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/modules/axios-adapter/axios.adapter';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpAdapter: AxiosAdapter) {}

  async get(url: string): Promise<any> {
    return await this.httpAdapter.get(url);
  }
}
