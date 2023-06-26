import { ProductResponse } from '../entities/product-response.entity';
import { v4 as uuidv4 } from 'uuid';

export const PRODUCT_FOUND: ProductResponse = {
  id: uuidv4(),
  title: 'any_product_title',
  image: 'any_image_path.png',
  reviewScore: 5,
  price: 9.99,
};
