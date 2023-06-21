import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto } from './dto/client-response.dto';
import ClientAlreadyExistsException from './exceptions/client-already-exists.exception';
import ClientNotFoundException from './exceptions/client-not-found.exception';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientsRepository) {}

  private async findByEmail(email: string): Promise<ClientResponseDto> {
    return await this.clientRepository.findOneByEmail(email);
  }

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    const clientAlreadyExists = await this.findByEmail(createClientDto.email);
    if (clientAlreadyExists) {
      throw new ClientAlreadyExistsException();
    }
    return this.clientRepository.save(createClientDto);
  }

  async findAll(): Promise<ClientResponseDto[]> {
    return this.clientRepository.findAll();
  }

  async findOne(id: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOneById(id);
    if (!client) {
      throw new ClientNotFoundException();
    }
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
