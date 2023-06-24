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
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
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
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
      required: ['name', 'email'],
    },
  })
  createWishlist(@Param('id') clientId: string): Promise<WishlistResponseDto> {
    return this.clientsService.createWishlist(clientId);
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
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
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
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
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
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
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
