import { Controller, Get, Version, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @ApiTags('wishlist')
  @Get('client/:clientId')
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'wishlist',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '3e66aca2-7a37-430d-91c4-ffd4c537b848',
        },
        clientId: {
          type: 'string',
          example: '0f58e503-6399-4cfd-770e-e025f30a2f5c',
        },
        products: {
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
      },
    },
  })
  get(@Param('clientId') clientId: string) {
    return this.wishlistService.getWishlistByClientId(clientId);
  }
}
