import { RootState } from "..";
import { GetOrdersModel } from "../Models/Order/GetOrdersModel";

export const selectLoadingOrders = (state: RootState): boolean =>
  state.order.loadingOrders;

export const selectGetOrders = (state: RootState): GetOrdersModel =>
  state.order.orders;
