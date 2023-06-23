import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistRepository } from './wishlist.repository';
import { WishlistResponseDto } from './dto/wishlist-response.dto';
import WishlistAlreadyExistsException from './exception/wishlist-already-exists.exception';
import { Product } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(private wishlistRepository: WishlistRepository) {}

  async findWishlistByClientId(clientId: string): Promise<WishlistResponseDto> {
    return this.wishlistRepository.findByClientId(clientId);
  }

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

  async addProductToWishlist(
    clientId: string,
    productId: string,
  ): Promise<WishlistResponseDto> {
    const { id: wishlistId } = await this.findWishlistByClientId(clientId);
    const product: Product = {
      id: '',
      title: '',
      image: '',
      review: 5,
      price: 9.99,
    };
    return this.wishlistRepository.addProduct(wishlistId, product);
  }
}
