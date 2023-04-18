import { RootState } from "..";
import { CartModel } from "../Models/Cart/CartModel";
import { ProductItemModel } from "../Models/Product/ProductItem";

export const selectCartItems = (state: RootState): ProductItemModel[] => {
  return state.cart.cartItems;
};

export const selectLoadingCart = (state: RootState): boolean => {
  return state.cart.loadingCart;
};

export const selectTotalPrice = (state: RootState): number => {
  return state.cart.totalPrice;
};

export const selectAbandonedCarts = (state: RootState): CartModel[] => {
  return state.cart.abandonedCarts;
};

export const selectAbandonedCartsFilters = (
  state: RootState
): {
  count: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
} => {
  return state.cart.filters;
};
