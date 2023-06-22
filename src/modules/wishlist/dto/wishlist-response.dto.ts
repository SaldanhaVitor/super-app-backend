import { Product } from '../entities/wishlist.entity';

export class WishlistResponseDto {
  id: string;
  clientId: string;
  products: Product[];
}
