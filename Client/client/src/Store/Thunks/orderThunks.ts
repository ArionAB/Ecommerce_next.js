import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { guidRegex } from "../../Utils/Functions/guidRegex";
import { OrderStatusType } from "../Enums/Order/OrderStatusType";

import { AddOrderModel } from "../Models/Order/AddOrderModel";
import { ChangeOrderStatusModel } from "../Models/Order/ChangeOrderStatusModel.";
import { GetPaginatedOrdersModel } from "../Models/Order/GetPaginatedOrdersModel";
import { OrderFiltersModel } from "../Models/Order/OrderFiltersModel";

const axios = require("axios").default;

export const addOrder = createAsyncThunk<
  any,
  { data: AddOrderModel },
  AppThunkConfig
>("/Order/Add", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();

    form.append("status", data.status.toString());
    form.append("paymentMethod", data.paymentMethod.toString());
    form.append("userId", data.userId ? data.userId : "");
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

    if (!guidRegex(data.userId)) {
      form.append("address.firstName", data.address.firstName);
      form.append("address.lastName", data.address.lastName);
      form.append("address.email", data.address.email);
      form.append("address.address", data.address.address);
      form.append("address.info", data.address.info ?? "");
      form.append(
        "address.zipCode",
        data.address.zipCode ? data.address.zipCode.toString() : "0"
      );
      form.append("address.city", data.address.city);
      form.append("address.county", data.address.county);
      form.append("address.phone", data.address.phone);
      form.append("address.firstNameBill", data.address.firstNameBill);
      form.append("address.lastNameBill", data.address.lastNameBill);
      form.append("address.addressBill", data.address.addressBill);
      form.append("address.infoBill", data.address.infoBill ?? "");
      form.append(
        "address.zipCodeBill",
        data.address.zipCodeBill ? data.address.zipCodeBill.toString() : "0"
      );
      form.append("address.cityBill", data.address.cityBill);
      form.append("address.countyBill", data.address.countyBill);
    }

    let { response } = await axios.post(baseUrl + "order/Add", form, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const getOrders = createAsyncThunk<
  GetPaginatedOrdersModel,
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

export const changeOrderStatus = createAsyncThunk<
  any,
  { token: string | undefined; order: ChangeOrderStatusModel },
  AppThunkConfig
>("/Order/ChangeOrderStatus", async ({ token, order }, thunkApi) => {
  try {
    let { response } = await axios.post(
      baseUrl + "order/ChangeOrderStatus",
      {
        orderId: order.orderId,
        status: order.status,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
