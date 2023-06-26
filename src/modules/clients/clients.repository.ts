import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
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
        password: Math.floor(Math.random() * Date.now()).toString(36),
      };
      this.clients.push(newClient);
      resolve(newClient);
    });
  }

  async findAll(): Promise<Client[]> {
    return new Promise((resolve) => {
      resolve(this.clients);
    });
  }

  async findOneById(id: string): Promise<Client> {
    return new Promise((resolve) => {
      const client = this.clients.find((client) => client.id == id);
      resolve(client);
    });
  }

  async findOneByEmail(email: string): Promise<Client> {
    return new Promise((resolve) => {
      const client = this.clients.find((client) => client.email == email);
      resolve(client);
    });
  }

  async update(updateClientDto: ClientResponseDto): Promise<Client> {
    return new Promise((resolve) => {
      const client = this.clients.find(
        (client) => client.id == updateClientDto.id,
      );
      Object.assign(client, updateClientDto);
      resolve(client);
    });
  }

  async remove(id: string): Promise<void> {
    new Promise((resolve) => {
      const clientIndex = this.clients.findIndex((client) => client.id == id);
      this.clients.splice(clientIndex, 1);
      resolve(clientIndex);
    });
  }
}
