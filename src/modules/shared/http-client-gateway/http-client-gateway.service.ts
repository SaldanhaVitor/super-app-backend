import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/modules/axios-adapter/axios.adapter';

@Injectable()
export class HttpClientGatewayService {
  constructor(private readonly httpAdapter: AxiosAdapter) {}

  async get(url: string): Promise<any> {
    return await this.httpAdapter.get(url);
  }
}
