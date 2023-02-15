import { createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../Models/Order/OrderState";
import { getOrders } from "../Thunks/orderThunks";

const initialState: OrderState = {
  actions: {},
  loadingOrders: false,
  orders: {
    shippingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      info: "",
      zipCode: "",
      city: "",
      county: "",
      phone: "",
      firstNameBill: "",
      lastNameBill: "",
      addressBill: "",
      infoBill: "",
      zipCodeBill: "",
      cityBill: "",
      countyBill: "",
      phoneBill: "",
    },
    orders: [],
  },
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    resetOrderState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      state.loadingOrders = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loadingOrders = false;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loadingOrders = false;
    });
  },
});
