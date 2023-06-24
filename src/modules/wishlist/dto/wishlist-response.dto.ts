import { Product } from '../../product/entities/product.entity';

export class WishlistResponseDto {
  id: string;
  clientId: string;
  products: Product[];
}
