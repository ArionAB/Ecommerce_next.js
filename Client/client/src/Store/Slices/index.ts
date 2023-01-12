import { authenticationSlice } from "./authenticateSlice";
import { baseSlice } from "./baseSlice";
import { cartSlice } from "./cartSlice";
import { productSlice } from "./productSlice";

export const reducers = {
  base: baseSlice.reducer,
  product: productSlice.reducer,
  authentication: authenticationSlice.reducer,
  cart: cartSlice.reducer,
};
