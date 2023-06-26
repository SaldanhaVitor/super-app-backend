import { Controller, Get, Query, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiTags('product')
  @ApiResponse({
    status: 200,
    description: 'Product',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'string',
            example: '3d4abf6d-b4e8-4258-925b-10f634881310',
          },
          title: {
            type: 'string',
            example: 'Dolce & Gabbana Dolce Floral Drops',
          },
          image: { type: 'string', example: 'path_to_image.png' },
          price: { type: 'number', example: 8.99 },
          review: { type: 'number', example: 4.7 },
        },
      },
    },
  })
  @Version('1')
  @Get()
  findAll(@Query('page') page: number): Promise<Product[]> {
    return this.productService.listProducts(Number(page));
  }
}
