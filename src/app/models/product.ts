export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  collectionId: string;
  imageUrls: string[];
  mainImageUrl: string;
}
