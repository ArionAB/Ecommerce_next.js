'use client'

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddProductItemModel } from "../Models/Product/AddProductItem";
import { FiltersModel } from "../Models/Product/FiltersModel";
import { GetAllProductItemsModel } from "../Models/Product/GetAllProductItemsModel";
import { ProductItemModel } from "../Models/Product/ProductItem";
import { UpdateProductItemModel } from "../Models/Product/UpdateProductItemModel";

const axios = require("axios").default;



export const addProductItem = createAsyncThunk<
  any,
  { data: AddProductItemModel; token: string | undefined | null },
  AppThunkConfig
>("/Product/Add", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("priceKg", data.priceKg);
    form.append("priceHalf", data.priceHalf);
    form.append("description", data.description);
    form.append("title", data.title);
    form.append("fruitType", data.fruitType);
    form.append("productCategory", data.productCategory.toString());
    form.append("inStock", "true");

    data.pictures.forEach((picture: any, index) =>
      form.append(`pictures`, picture)
    );

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

export const updateProductItem = createAsyncThunk<
  any,
  { data: UpdateProductItemModel; deletedImages: string[] },
  AppThunkConfig
>("/Product/Update", async ({ data, deletedImages }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("priceKg", data.priceKg);
    form.append("priceHalf", data.priceHalf);
    form.append("productId", data.productId);
    form.append("description", data.description);
    form.append("title", data.title);
    form.append("fruitType", data.fruitType.toString());
    form.append("productCategory", data.productCategory.toString());
    form.append("inStock", data.inStock.toString());
    data.newAdditionalPictures.forEach((picture: any, index) =>
      form.append(`newAdditionalPictures`, picture)
    );
    deletedImages.forEach((picture: any, index) =>
      form.append(`deletedAdditionalPictures`, picture)
    );

    let { response } = await axios.post(baseUrl + "product/update", form, {
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
>("/Product/GetItems", async (SearchText, thunkApi) => {
  try {
    let form = new FormData();
    form.append("SearchText", SearchText);

    let { data } = await axios.post(baseUrl + "Product/GetItems", form, {
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

export const deleteProduct = createAsyncThunk<any, string, AppThunkConfig>(
  "/Product/Delete",
  async (id, thunkApi) => {
    let form = new FormData();
    form.append("id", id);
    try {
      let { data } = await axios.post(baseUrl + "Product/Delete/", form, {
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
  }
);
