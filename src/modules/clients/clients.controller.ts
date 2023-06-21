import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientResponseDto } from './dto/client-response.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiTags('clients')
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
  @UsePipes(ValidationPipe)
  create(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.create(createClientDto);
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
  @Get()
  findAll(): Promise<ClientResponseDto[]> {
    return this.clientsService.findAll();
  }

  @ApiTags('clients')
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
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.findOne(id);
  }

  @ApiTags('clients')
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
