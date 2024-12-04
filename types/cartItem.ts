import { ProductType } from "./product";

export interface CartItemType {
  id?: number;
  productId: string; 
  userId: string;
  quantity: number;
  sellingPrice: number;
  totalPrice?: number;
  image: string;
  name: string;
  product?: ProductType
}
