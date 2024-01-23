import { Product } from './product';

export interface Collection {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  products: Product[];
}
