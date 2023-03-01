import { BaseState } from "../BaseState";
import { GetPaginatedOrdersModel } from "./GetPaginatedOrdersModel";
import { OrderFiltersModel } from "./OrderFiltersModel";
import { OrderModel } from "./OrderModel";

export interface OrderState extends BaseState {
  orders: GetPaginatedOrdersModel;
  loadingOrders: boolean;
  ordersFilters: OrderFiltersModel;
}
