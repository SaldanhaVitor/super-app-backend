import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export const PRODUCT_FOUND_WITHOUT_REVIEW: Product = {
  id: uuidv4(),
  title: 'any_product_title',
  image: 'any_image_path.png',
  price: 9.99,
};
