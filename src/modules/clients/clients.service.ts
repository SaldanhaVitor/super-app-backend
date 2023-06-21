import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto } from './dto/client-response.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientRepository.save(createClientDto);
  }

  findAll(): ClientResponseDto[] {
    return this.clientRepository.findAll();
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
