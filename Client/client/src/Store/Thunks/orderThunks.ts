import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddOrderModel } from "../Models/Order/AddOrderModel";
import { GetOrdersModel } from "../Models/Order/GetOrdersModel";

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
  GetOrdersModel,
  { userId?: string },
  AppThunkConfig
>("/Order/GetOrders", async ({ userId }, thunkApi) => {
  try {
    let { data } = await axios.get(baseUrl + "order/GetOrders", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
      },
    });

    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
