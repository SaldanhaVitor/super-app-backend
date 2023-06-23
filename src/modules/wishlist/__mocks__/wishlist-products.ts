import { v4 as uuidv4 } from 'uuid';
import { Wishlist } from '../entities/wishlist.entity';

export const WISHLIST_WITH_PRODUCT: Wishlist = {
  id: uuidv4(),
  clientId: uuidv4(),
  products: [
    {
      id: uuidv4(),
      title: 'any_title',
      price: 10.99,
      image: 'image_url',
      review: 5,
    },
  ],
};
