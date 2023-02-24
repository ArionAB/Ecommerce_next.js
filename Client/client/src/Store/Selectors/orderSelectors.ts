import { RootState } from "..";
import { OrderModel } from "../Models/Order/OrderModel";

export const selectLoadingOrders = (state: RootState): boolean =>
  state.order.loadingOrders;

export const selectGetOrders = (state: RootState): OrderModel[] =>
  state.order.orders;
