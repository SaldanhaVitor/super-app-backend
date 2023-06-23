import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistRepository } from './wishlist.repository';
import { WishlistResponseDto } from './dto/wishlist-response.dto';
import WishlistAlreadyExistsException from './exception/wishlist-already-exists.exception';
import { Product, Wishlist } from './entities/wishlist.entity';
import ProductAlreadyInWishlistException from './exception/product-already-in-wishlist.exception';
import WishlistNotFoundException from './exception/wishlist-not-found.exception';

@Injectable()
export class WishlistService {
  constructor(private wishlistRepository: WishlistRepository) {}

  private productIsAlreadyInWishlist(
    productId: string,
    wishlist: Wishlist,
  ): boolean {
    return wishlist.products.some(
      (product: Product) => product.id === productId,
    );
  }

  async findWishlistByClientId(clientId: string): Promise<WishlistResponseDto> {
    return await this.wishlistRepository.findByClientId(clientId);
  }

  async create(
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistResponseDto> {
    const { clientId } = createWishlistDto;
    const wishlistAlreadyExists = await this.findWishlistByClientId(clientId);
    if (wishlistAlreadyExists) {
      throw new WishlistAlreadyExistsException();
    }
    return this.wishlistRepository.save(clientId);
  }

  async addProductToWishlist(
    clientId: string,
    productId: string,
  ): Promise<WishlistResponseDto> {
    const wishlist = await this.findWishlistByClientId(clientId);
    if (!wishlist) {
      throw new WishlistNotFoundException();
    }
    const productAlreadyExistsInWishlist = this.productIsAlreadyInWishlist(
      productId,
      wishlist,
    );
    if (productAlreadyExistsInWishlist) {
      throw new ProductAlreadyInWishlistException();
    }
    const product: Product = {
      id: '',
      title: '',
      image: '',
      review: 5,
      price: 9.99,
    };
    return this.wishlistRepository.addProduct(wishlist.id, product);
  }
}
