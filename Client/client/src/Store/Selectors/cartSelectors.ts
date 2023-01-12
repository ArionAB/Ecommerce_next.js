import { RootState } from "..";
import { ProductItemModel } from "../Models/Product/ProductItem";

export const selectCartItems = (state: RootState): ProductItemModel[] => {
  return state.cart.cartItems;
};

export const selectLoadingCart = (state: RootState): boolean => {
  return state.cart.loadingCart;
};
