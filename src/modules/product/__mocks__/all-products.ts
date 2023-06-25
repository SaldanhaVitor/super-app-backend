import { v4 as uuidv4 } from 'uuid';

export const PRODUCTS = {
  products: [
    {
      id: uuidv4(),
      title: 'any_product_title',
      image: 'any_image_path.png',
      review: 5,
      price: 9.99,
    },
    {
      id: uuidv4(),
      title: 'any_product_title_2',
      image: 'any_image_path_2.png',
      price: 4.99,
    },
    {
      id: uuidv4(),
      title: 'any_product_title_3',
      image: 'any_image_path_3.png',
      review: 3.7,
      price: 3.99,
    },
  ],
};
