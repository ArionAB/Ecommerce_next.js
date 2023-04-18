import { appNotificationSlice } from "./appNotificationSlice";
import { authenticationSlice } from "./authenticateSlice";
import { baseSlice } from "./baseSlice";
import { cartSlice } from "./cartSlice";
import { orderSlice } from "./orderSlice";
import { productSlice } from "./productSlice";
import { statisticsSlice } from "./statisticsSlice";
import { usersSlice } from "./usersSlice";

export const reducers = {
  base: baseSlice.reducer,
  product: productSlice.reducer,
  authentication: authenticationSlice.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer,
  users: usersSlice.reducer,
  statistics: statisticsSlice.reducer,
  notification: appNotificationSlice.reducer,
};
