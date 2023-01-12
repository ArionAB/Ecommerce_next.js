import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddItemToCartModel } from "../Models/Cart/AddItemToCartModel";
import { ProductItemModel } from "../Models/Product/ProductItem";

const axios = require("axios").default;

export const addItemToCart = createAsyncThunk<
  any,
  { data: AddItemToCartModel; token: string | undefined | null },
  AppThunkConfig
>("/Cart/Add", async ({ data, token }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("productId", data.productId);
    form.append("sizeType", data.sizeType.toString());
    form.append("quantity", data.quantity.toString());

    let { response } = await axios.post(baseUrl + "cart/Add", form, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const getCartItems = createAsyncThunk<
  ProductItemModel[],
  { token: string | undefined },
  AppThunkConfig
>("/Cart/GetCartItems", async ({ token }, thunkApi) => {
  try {
    let { data } = await axios.get(baseUrl + "cart/GetCartItems", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
