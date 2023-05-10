import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../Models/Cart/CartState";
import { ProductItemModel } from "../Models/Product/ProductItem";
import { getAbandonedCarts, getCartItems } from "../Thunks/cartThunks";
import { CartModel } from "../Models/Cart/CartModel";

const initialState: CartState = {
  actions: {},
  loadingCart: false,
  cartItems: new Array<ProductItemModel>(),
  totalPrice: 0,
  abandonedCarts: new Array<CartModel>(),
  filters: {
    count: 0,
    totalPages: 0,
    pageSize: 10,
    pageNumber: 0,
  },
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    resetCartState: () => initialState,
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setAbandonedCartsFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      state.loadingCart = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loadingCart = false;
      state.totalPrice = action.payload.reduce(
        (acc, item) => acc + Number(item.priceKg) * Number(item.quantity),
        0
      );
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loadingCart = false;
    });
    builder.addCase(getAbandonedCarts.pending, (state, action) => {
      state.loadingCart = true;
    });
    builder.addCase(getAbandonedCarts.fulfilled, (state, action) => {
      state.abandonedCarts = action.payload.abandonedCarts;
      state.filters.count = action.payload.count;
      state.filters.totalPages = action.payload.totalPages;
      state.loadingCart = false;
    });
    builder.addCase(getAbandonedCarts.rejected, (state, action) => {
      state.loadingCart = false;
    });
  },
});

export const { resetCartState, setCartItems, setAbandonedCartsFilters } =
  cartSlice.actions;
