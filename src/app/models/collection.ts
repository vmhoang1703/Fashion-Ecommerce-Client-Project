import { Product } from './product';

export interface Collection {
  _id: number;
  title: string;
  description: string;
  imageUrl: string;
  products: Product[];
}
