import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { UserType } from "../Enums/UserType";
import { AddOrderModel } from "../Models/Order/AddOrderModel";
import { OrderFiltersModel } from "../Models/Order/OrderFiltersModel";
import { OrderModel } from "../Models/Order/OrderModel";

const axios = require("axios").default;

export const addOrder = createAsyncThunk<
  any,
  { data: AddOrderModel; token: string | undefined | null },
  AppThunkConfig
>("/Order/Add", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("status", data.status.toString());
    form.append("paymentMethod", data.paymentMethod.toString());
    data.orderProducts.forEach((orderProduct, index) => {
      form.append(`orderProducts[${index}].productId`, orderProduct.productId);
      form.append(`orderProducts[${index}].title`, orderProduct.title);
      form.append(
        `orderProducts[${index}].price`,
        orderProduct.price.toString()
      );
      form.append(
        `orderProducts[${index}].sizeType`,
        orderProduct.sizeType.toString()
      );
      form.append(
        `orderProducts[${index}].fruitType`,
        orderProduct.fruitType.toString()
      );
      form.append(
        `orderProducts[${index}].productCategory`,
        orderProduct.productCategory.toString()
      );
      form.append(
        `orderProducts[${index}].quantity`,
        orderProduct.quantity.toString()
      );
      form.append(`orderProducts[${index}].filePath`, orderProduct.filePath);
    });

    let { response } = await axios.post(baseUrl + "order/Add", form, {
      withCredentials: true,
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const getOrders = createAsyncThunk<
  OrderModel[],
  { token: string | undefined; filters: OrderFiltersModel },
  AppThunkConfig
>("/Order/GetOrders", async ({ token, filters }, thunkApi) => {
  try {
    let { data } = await axios.get(baseUrl + "order/GetOrders", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      params: filters,
    });

    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
