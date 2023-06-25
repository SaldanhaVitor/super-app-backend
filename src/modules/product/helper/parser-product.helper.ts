import { Product } from '../entities/product.entity';

export const ProductParser = (productResponse: any): Product => {
  return {
    id: productResponse.id ?? 'missing id',
    title: productResponse.title ?? 'missing title',
    review: productResponse?.review ?? 'missing review',
    image: productResponse.image ?? 'missing image',
    price: productResponse.price ?? 'missing price',
  };
};

export const AllProductsParser = (allProductsResponse: any[]): Product[] => {
  const products: Product[] = [];
  for (const product of allProductsResponse) {
    products.push({
      id: product.id ?? 'missing id',
      title: product.title ?? 'missing title',
      review: product?.review ?? 'missing review',
      image: product.image ?? 'missing image',
      price: product.price ?? 'missing price',
    });
  }
  return products;
};
