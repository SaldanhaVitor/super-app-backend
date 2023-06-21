import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto } from './dto/client-response.dto';
import ClientAlreadyExistsException from './exceptions/client-already-exists.exception';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    const clientAlreadyExists = await this.findByEmail(createClientDto.email);
    if (clientAlreadyExists) {
      throw new ClientAlreadyExistsException();
    }
    return this.clientRepository.save(createClientDto);
  }

  findAll(): ClientResponseDto[] {
    return this.clientRepository.findAll();
  }

  async findByEmail(email: string): Promise<ClientResponseDto> {
    return await this.clientRepository.findOneByEmail(email);
  }

  findOne(id: string): ClientResponseDto {
    return this.clientRepository.findOneById(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
