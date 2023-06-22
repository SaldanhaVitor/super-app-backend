import { Injectable } from '@nestjs/common';
import { WishlistResponseDto } from './dto/wishlist-response.dto';
import { Wishlist } from './entities/wishlist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WishlistRepository {
  private wishlist: Wishlist[];

  constructor() {
    this.wishlist = [];
  }

  async save(clientId: string): Promise<WishlistResponseDto> {
    return new Promise((resolve) => {
      const wishlist = {
        id: uuidv4(),
        clientId,
        products: [],
      };
      this.wishlist.push(wishlist);
      resolve(wishlist);
    });
  }

  async findByClientId(clientId: string): Promise<WishlistResponseDto> {
    return new Promise((resolve) => {
      const wishlist = this.wishlist.find(
        (wishlist) => wishlist.clientId === clientId,
      );
      resolve(wishlist);
    });
  }
}
