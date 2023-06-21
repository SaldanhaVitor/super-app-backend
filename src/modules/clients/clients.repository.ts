import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ClientResponseDto } from './dto/client-response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientsRepository {
  private clients: Client[];

  constructor() {
    this.clients = [];
  }

  async save(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return new Promise((resolve) => {
      const newClient = {
        id: uuidv4(),
        ...createClientDto,
      };
      this.clients.push(newClient);
      resolve(newClient);
    });
  }

  findAll(): ClientResponseDto[] {
    return this.clients;
  }

  findOneById(id: string): Promise<ClientResponseDto> {
    return new Promise((resolve) => {
      const client = this.clients.find((client) => client.id == id);
      resolve(client);
    });
  }

  findOneByEmail(email: string): Promise<ClientResponseDto> {
    return new Promise((resolve) => {
      const client = this.clients.find((client) => client.email == email);
      resolve(client);
    });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
