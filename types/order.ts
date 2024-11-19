export type OrderType={
  orderId: string
 productName: string
  departureDate: string
  deliveryDate: string
  totalAmount: string
  status: string
}

export type Order = {
  id: string;
  customerName: string;
  productName: string;
  orderDate: string;
  paymentStatus: string;
  totalPrice: number;
}