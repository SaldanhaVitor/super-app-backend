import { Product } from '../entities/product.entity';

export const ProductParser = (productResponse: any): Product => {
  return {
    id: productResponse.id,
    title: productResponse.title,
    review: productResponse?.reviewScore,
    image: productResponse.image,
    price: productResponse.price,
  };
};

export const AllProductsParser = (allProductsResponse: any[]): Product[] => {
  const products: Product[] = [];
  for (const product of allProductsResponse) {
    products.push({
      id: product.id,
      title: product.title,
      review: product?.reviewScore,
      image: product.image,
      price: product.price,
    });
  }
  return products;
};
