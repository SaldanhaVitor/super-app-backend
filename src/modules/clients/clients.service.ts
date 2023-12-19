import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto } from './dto/client-response.dto';
import ClientAlreadyExistsException from './exceptions/client-already-exists.exception';
import ClientNotFoundException from './exceptions/client-not-found.exception';
import { WishlistResponseDto } from '../wishlist/dto/wishlist-response.dto';
import { WishlistService } from '../wishlist/wishlist.service';
import { ParseClients, ParseClient } from './helpers/parse-clients.helper';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientsRepository,
    private readonly wishlistService: WishlistService,
  ) { }

  private async findByEmail(email: string): Promise<Client> {
    return await this.clientRepository.findOneByEmail(email);
  }

  private clientAlreadyExists(client: Client): boolean {
    return !!client;
  }

  private clientCanBeCreated(client: Client) {
    if (this.clientAlreadyExists(client)) {
      throw new ClientAlreadyExistsException();
    }
  }

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    this.clientCanBeCreated(await this.findByEmail(createClientDto.email))
    return this.clientRepository.save(createClientDto);
  }

  async createWishlist(clientId: string): Promise<WishlistResponseDto> {
    const client = await this.findOne(clientId);
    return this.wishlistService.create({ clientId: client.id });
  }

  async addProductToWishlist(
    clientId: string,
    productId: string,
  ): Promise<WishlistResponseDto> {
    const client = await this.findOne(clientId);
    return this.wishlistService.addProductToWishlist(client.id, productId);
  }

  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.clientRepository.findAll();
    return ParseClients(clients);
  }

  async findOne(id: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOneById(id);
    if (!client) {
      throw new ClientNotFoundException();
    }
    return ParseClient(client);
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    const client = await this.findOne(id);
    client.name = updateClientDto.name;
    await this.clientRepository.update(client);
    return client;
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client.id);
  }

  async findOneToAuthorize(email: string): Promise<Client> {
    const client = await this.clientRepository.findOneByEmail(email);
    if (!client) {
      throw new ClientNotFoundException();
    }
    return client;
  }
}
