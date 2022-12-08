import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddProductItemModel } from "../Models/Product/AddProductItem";
import { FiltersModel } from "../Models/Product/FiltersModel";
import { GetAllProductItemsModel } from "../Models/Product/GetAllProductItemsModel";

const axios = require("axios").default;

export const addProductItem = createAsyncThunk<
  any,
  { data: AddProductItemModel; productSize: any },
  AppThunkConfig
>("/Product/Add", async ({ data, productSize }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("price", data.price);

    form.append("description", data.description);
    form.append("title", data.title);
    form.append("subcategoryType", data.subcategoryType);
    form.append("productCategory", data.productCategory.toString());

    data.pictures.forEach((picture: any, index) =>
      form.append(`pictures`, picture)
    );
    productSize.forEach((size: any, index: number) => {
      form.append(`productSize[${index}].size`, size.size);
      form.append(`productSize[${index}].quantity`, size.quantity);
    });

    let { response } = await axios.post(baseUrl + "product/Add", form, {
      withCredentials: true,
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const getProductItems = createAsyncThunk<
  GetAllProductItemsModel,
  string,
  AppThunkConfig
>("/Product/GetItems", async (string, thunkApi) => {
  try {
    let form = new FormData();
    form.append("SearchText", string);
    let { data } = await axios.get(baseUrl + "Product/GetItems", form, {
      withCredentials: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const getPaginatedProductItems = createAsyncThunk<
  GetAllProductItemsModel,
  { filters: FiltersModel },
  AppThunkConfig
>("/Product/GetPaginatedItems", async (filters, thunkApi) => {
  try {
    let { data } = await axios.get(
      baseUrl + "Product/GetPaginatedItems",
      filters,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
