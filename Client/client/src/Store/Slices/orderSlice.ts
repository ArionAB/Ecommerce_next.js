import { createSlice } from "@reduxjs/toolkit";
import { DataGridColumnNames } from "../Enums/DataGridColumnNames";
import { OrderState } from "../Models/Order/OrderState";
import { getOrders } from "../Thunks/orderThunks";

const initialState: OrderState = {
  actions: {},
  loadingOrders: false,
  orders: {
    orders: [
      {
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
          orderId: "",
          orderAddressId: "",
        },
        orderProducts: [],
        orderId: "",
        userId: "",
        dateCreated: "",
        status: "",
        paymentMethod: "",
        totalPrice: 0,
        totalProducts: 0,
      },
    ],
    pageNumber: 0,
    totalCount: 0,
    totalPages: 0,
  },

  ordersFilters: {
    pageNumber: 0,
    orderToSortBy: DataGridColumnNames.CreatedAt,
    sortingOrder: false,
  },
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    resetOrderState: () => initialState,
    setOrdersFilters: (state, action) => {
      state.ordersFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loadingOrders = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loadingOrders = false;
      state.orders.totalCount = action.payload.totalCount;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.loadingOrders = false;
    });
  },
});

export const { resetOrderState, setOrdersFilters } = orderSlice.actions;
