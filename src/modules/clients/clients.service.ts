import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './clients.repository';
import { ClientResponseDto } from './dto/client-response.dto';
import ClientAlreadyExistsException from './exceptions/client-already-exists.exception';
import ClientNotFoundException from './exceptions/client-not-found.exception';
import { WishlistResponseDto } from '../wishlist/dto/wishlist-response.dto';
import { WishlistService } from '../wishlist/wishlist.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientsRepository,
    private readonly wishlistService: WishlistService,
  ) {}

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

  async createWishlist(clientId: string): Promise<WishlistResponseDto> {
    return this.wishlistService.create({ clientId });
  }

  async addProductToWishlist(
    clientId: string,
    productId: string,
  ): Promise<WishlistResponseDto> {
    return this.wishlistService.addProductToWishlist(clientId, productId);
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
}
