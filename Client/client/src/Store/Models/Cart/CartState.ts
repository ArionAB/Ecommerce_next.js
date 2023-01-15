import { BaseState } from "../BaseState";
import { ProductItemModel } from "../Product/ProductItem";

export interface CartState extends BaseState {
  cartItems: ProductItemModel[];
  loadingCart: boolean;
  totalPrice: number;
}
