import { BaseState } from "../BaseState";
import { OrderModel } from "./OrderModel";

export interface OrderState extends BaseState {
  orders: OrderModel[];
  loadingOrders: boolean;
}
