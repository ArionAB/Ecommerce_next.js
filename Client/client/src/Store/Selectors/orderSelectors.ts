import { RootState } from "..";
import { GetPaginatedOrdersModel } from "../Models/Order/GetPaginatedOrdersModel";
import { OrderFiltersModel } from "../Models/Order/OrderFiltersModel";
import { OrderModel } from "../Models/Order/OrderModel";

export const selectLoadingOrders = (state: RootState): boolean =>
  state.order.loadingOrders;

export const selectGetOrders = (state: RootState): GetPaginatedOrdersModel =>
  state.order.orders;

export const selectOrdersFilters = (state: RootState): OrderFiltersModel =>
  state.order.ordersFilters;

export const selectTotalOrders = (state: RootState): number =>
  state.order.orders.totalCount;
