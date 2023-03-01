import { OrderModel } from "./OrderModel";

export interface GetPaginatedOrdersModel {
  orders: OrderModel[];
  pageNumber: number;
  totalCount: number;
  totalPages: number;
}
