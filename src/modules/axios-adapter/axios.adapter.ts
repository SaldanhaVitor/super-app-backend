import { Injectable } from '@nestjs/common';
import { HttpClient } from '../shared/http-client/interfaces/http-client.interface';
import axios from 'axios';

@Injectable()
export class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
}
