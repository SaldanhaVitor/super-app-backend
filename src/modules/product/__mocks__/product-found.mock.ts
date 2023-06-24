import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export const PRODUCT_FOUND: Product = {
  id: uuidv4(),
  title: 'any_product_title',
  image: 'any_image_path.png',
  review: 5,
  price: 9.99,
};
