import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../Models/Cart/CartState";
import { ProductItemModel } from "../Models/Product/ProductItem";
import { getCartItems } from "../Thunks/cartThunks";

const initialState: CartState = {
  actions: {},
  loadingCart: false,
  cartItems: new Array<ProductItemModel>(),
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    resetCartState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      state.loadingCart = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loadingCart = false;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loadingCart = false;
    });
  },
});
