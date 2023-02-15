import { OrderProductModel } from "./OrderProductModel";

export interface OrderModel {
  orderId: string;
  userId: string;
  dateCreated: string;
  status: string;
  paymentMethod: string;
  orderProducts: OrderProductModel[];
  totalPrice: number;
}
