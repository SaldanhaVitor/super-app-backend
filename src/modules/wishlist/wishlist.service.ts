import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistRepository } from './wishlist.repository';
import { WishlistResponseDto } from './dto/wishlist-response.dto';
import WishlistAlreadyExistsException from './exception/wishlist-already-exists.exception';

@Injectable()
export class WishlistService {
  constructor(private wishlistRepository: WishlistRepository) {}

  async create(
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistResponseDto> {
    const { clientId } = createWishlistDto;
    const wishlistAlreadyExists = await this.findWishlistByClientId(clientId);
    if (wishlistAlreadyExists) {
      throw new WishlistAlreadyExistsException();
    }
    const wishlist = await this.wishlistRepository.save(clientId);
    return wishlist;
  }

  async findWishlistByClientId(clientId: string): Promise<WishlistResponseDto> {
    return this.wishlistRepository.findByClientId(clientId);
  }
}
