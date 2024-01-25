export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  collectionId: string;
  mainImageUrl: string;
  otherImageUrls: string[];
}
