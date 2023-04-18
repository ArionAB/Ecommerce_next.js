import { CartModel } from "./CartModel";

export interface GetAbandonedCartsModel {
  count: number;
  abandonedCarts: CartModel[];
  totalPages: number;
}
