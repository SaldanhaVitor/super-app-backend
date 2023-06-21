import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ClientResponseDto } from './dto/client-response.dto';

@Injectable()
export class ClientsRepository {
  private clients: Client[];

  constructor() {
    this.clients = [];
  }

  save(createClientDto: CreateClientDto): ClientResponseDto {
    const client = createClientDto;
    this.clients.push(client);
    return client;
  }

  findAll(): ClientResponseDto[] {
    return this.clients;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
