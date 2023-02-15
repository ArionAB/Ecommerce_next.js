import { BaseState } from "../BaseState";
import { GetOrdersModel } from "./GetOrdersModel";

export interface OrderState extends BaseState {
  orders: GetOrdersModel;
  loadingOrders: boolean;
}
