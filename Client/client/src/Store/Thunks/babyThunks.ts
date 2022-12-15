import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddProductItemModel } from "../Models/Product/AddProductItem";
import { FiltersModel } from "../Models/Product/FiltersModel";
import { GetAllProductItemsModel } from "../Models/Product/GetAllProductItemsModel";
import { ProductItemModel } from "../Models/Product/ProductItem";

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
>("/Product/GetPaginatedItems", async ({ filters }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("PageNumber", filters.PageNumber.toString());
    form.append("PageSize", filters.PageSize.toString());
    form.append("SearchText", filters.SearchText.toString());
    form.append("MinPrice", filters.MinPrice.toString());
    form.append("MaxPrice", filters.MaxPrice.toString());
    form.append("ProductCategory", filters.ProductCategory.toString());
    form.append("SubcategoryType", filters.SubcategoryType.toString());
    if (filters.ProductSize.length > 0) {
      filters.ProductSize.forEach((size: any, index: number) => {
        form.append(`ProductSize[${index}]`, size);
      });
    }

    let { data } = await axios.post(
      baseUrl + "Product/GetPaginatedItems",
      form,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const getProduct = createAsyncThunk<
  ProductItemModel,
  string,
  AppThunkConfig
>("/Product/GetItem", async (id, thunkApi) => {
  try {
    let { data } = await axios.get(baseUrl + "Product/GetItem/", {
      withCredentials: true,
      params: { id: id },
      headers: {
        "Content-type": "application/json",
      },
    });

    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
