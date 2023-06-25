import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientResponseDto } from './dto/client-response.dto';
import { WishlistResponseDto } from '../wishlist/dto/wishlist-response.dto';
import { AddProductDto } from './dto/add-product-request.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiTags('clients')
  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Client created',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '3e66aca2-7a37-430d-91c4-ffd4c537b848',
        },
        name: {
          type: 'string',
          example: 'john',
        },
        email: {
          type: 'string',
          example: 'john@mail.com',
        },
      },
      required: ['name', 'email'],
    },
  })
  create(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.create(createClientDto);
  }

  @ApiTags('clients')
  @Version('1')
  @Post(':id/wishlist/create')
  @ApiResponse({
    status: 201,
    description: 'Wishlist created',
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
  createWishlist(@Param('id') clientId: string): Promise<WishlistResponseDto> {
    return this.clientsService.createWishlist(clientId);
  }

  @ApiTags('clients')
  @Version('1')
  @Post(':id/wishlist/addProduct')
  @ApiResponse({
    status: 201,
    description: 'Product added to Wishlist',
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
  addProductToWishlist(
    @Param('id') clientId: string,
    @Body() addProductDto: AddProductDto,
  ): Promise<WishlistResponseDto> {
    return this.clientsService.addProductToWishlist(
      clientId,
      addProductDto.productId,
    );
  }

  @ApiTags('clients')
  @ApiResponse({
    status: 200,
    description: 'Clients',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'string',
            example: '3e66aca2-7a37-430d-91c4-ffd4c537b848',
          },
          name: {
            type: 'string',
            example: 'john',
          },
          email: {
            type: 'string',
            example: 'john@mail.com',
          },
        },
      },
    },
  })
  @Version('1')
  @Get()
  findAll(): Promise<ClientResponseDto[]> {
    return this.clientsService.findAll();
  }

  @ApiTags('clients')
  @Version('1')
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Clients',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '3e66aca2-7a37-430d-91c4-ffd4c537b848',
        },
        name: {
          type: 'string',
          example: 'john',
        },
        email: {
          type: 'string',
          example: 'john@mail.com',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.findOne(id);
  }

  @ApiTags('clients')
  @Version('1')
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Clients',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '3e66aca2-7a37-430d-91c4-ffd4c537b848',
        },
        name: {
          type: 'string',
          example: 'john',
        },
        email: {
          type: 'string',
          example: 'john@mail.com',
        },
      },
      required: ['name'],
    },
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @ApiTags('clients')
  @Version('1')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.clientsService.remove(id);
  }
}
