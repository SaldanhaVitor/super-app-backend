import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from '../../../modules/axios-adapter/axios.adapter';
import { HttpClient } from './interfaces/http-client.interface';

@Injectable()
export class HttpClientService implements HttpClient {
  constructor(private readonly httpAdapter: AxiosAdapter) {}

  async get(url: string): Promise<any> {
    return await this.httpAdapter.get(url);
  }
}
