import { BaseState } from "../BaseState";
import { ProductItemModel } from "../Product/ProductItem";
import { CartModel } from "./CartModel";

export interface CartState extends BaseState {
  cartItems: ProductItemModel[];
  loadingCart: boolean;
  totalPrice: number;
  abandonedCarts: CartModel[];
  filters: {
    count: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
}
