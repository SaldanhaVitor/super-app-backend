import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { HttpClientService } from '../shared/http-client/http-client.service';
import { Constants } from '../../configs';
import {
  AllProductsParser,
  ProductParser,
} from './helper/parser-product.helper';
import ProductGenericException from './exceptions/product-generic-error.exception';

@Injectable()
export class ProductService {
  constructor(private readonly httpClient: HttpClientService) {}

  async getProductById(productId: string): Promise<Product> {
    try {
      const product = await this.httpClient.get(
        `${Constants.luizalabs.challengeApi}/${productId}/`,
      );
      console.log(product);
      return ProductParser(product);
    } catch (error) {
      throw new ProductGenericException(error.message, error.response);
    }
  }

  async listProducts(page: number): Promise<Product[]> {
    try {
      const { products } = await this.httpClient.get(
        `${Constants.luizalabs.challengeApi}/?page=${page}`,
      );
      return AllProductsParser(products);
    } catch (error) {
      throw new ProductGenericException(error.message, error.response);
    }
  }
}
