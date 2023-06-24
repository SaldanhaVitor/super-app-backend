import { Product } from '../entities/product.entity';

export const ProductParser = (data: any): Product => {
  return {
    id: data.id ?? 'missing id',
    title: data.title ?? 'missing title',
    review: data?.review ?? 'missing review',
    image: data.image ?? 'missing image',
    price: data.price ?? 'missing price',
  };
};
