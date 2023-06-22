export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  review?: number;
};
export class Wishlist {
  id: string;
  clientId: string;
  products: Product[];
}
