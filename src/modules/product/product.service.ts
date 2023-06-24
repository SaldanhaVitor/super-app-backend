import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { HttpClientService } from '../shared/http-client/http-client.service';
import { Constants } from '../../configs';
import { ProductParser } from './helper/parser-product.helper';

@Injectable()
export class ProductService {
  constructor(private readonly httpClient: HttpClientService) {}
  async getProductById(productId: string): Promise<Product> {
    const product = await this.httpClient.get(
      `${Constants.luizalabs.challengeApi}/${productId}`,
    );
    return ProductParser(product);
  }
}
