import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
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
}
