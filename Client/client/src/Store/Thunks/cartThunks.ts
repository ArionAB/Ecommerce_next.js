import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddItemToCartModel } from "../Models/Cart/AddItemToCartModel";
import { CartItemModel } from "../Models/Cart/CartItemModel";
import { ChangeQuantityModel } from "../Models/Cart/ChangeQuantityModel";
import { RemoveItemModel } from "../Models/Cart/RemoveItemModel";
import { ProductItemModel } from "../Models/Product/ProductItem";

const axios = require("axios").default;

export const addItemToCart = createAsyncThunk<
  any,
  { data: AddItemToCartModel; token: string | undefined | null },
  AppThunkConfig
>("/Cart/Add", async ({ data, token }, thunkApi) => {
  try {
    let form = new FormData();
    data.cartItems.forEach((item: CartItemModel, index: number) => {
      form.append(`cartItems[${index}].productId`, item.productId);
    });
    data.cartItems.forEach((item: CartItemModel, index: number) => {
      form.append(`cartItems[${index}].sizeType`, item.sizeType.toString());
    });
    data.cartItems.forEach((item: CartItemModel, index: number) => {
      form.append(`cartItems[${index}].quantity`, item.quantity.toString());
    });

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

export const changeQuantity = createAsyncThunk<
  any,
  { data: ChangeQuantityModel; token: string | undefined | null },
  AppThunkConfig
>("/Cart/ChangeQuantity", async ({ data, token }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("cartProductId", data.cartProductId);

    form.append("quantity", data.quantity.toString());

    let { response } = await axios.post(baseUrl + "cart/ChangeQuantity", form, {
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

export const removeItem = createAsyncThunk<
  any,
  { data: RemoveItemModel; token: string | undefined | null },
  AppThunkConfig
>("/Cart/RemoveItem", async ({ data, token }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("productId", data.productId);
    form.append("sizeType", data.sizeType.toString());

    let { response } = await axios.post(baseUrl + "cart/RemoveItem", form, {
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
