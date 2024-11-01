export interface CartItemType {
  productId: string; 
  userId: number;
  quantity: number;
  price: number;
  totalPrice?: number;
  image: string;
  name: string;
}
