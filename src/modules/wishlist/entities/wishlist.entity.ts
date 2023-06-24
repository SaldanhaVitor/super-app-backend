import { Product } from '../../../modules/product/entities/product.entity';
export class Wishlist {
  id: string;
  clientId: string;
  products: Product[];
}
