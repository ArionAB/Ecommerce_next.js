import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddBabyItemModel } from "../Models/Baby/AddBabyItem";
import { GetAllBabyItemsModel } from "../Models/Baby/GetAllBabyItemsModel";

const axios = require("axios").default;

export const addBabyItem = createAsyncThunk<
  any,
  { data: AddBabyItemModel },
  AppThunkConfig
>("Baby/Add", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("price", data.price);
    console.log(data);
    form.append("description", data.description);
    form.append("title", data.title);
    form.append("categoryType", data.categoryType);

    data.pictures.forEach((picture: any, index) =>
      form.append(`pictures`, picture)
    );
    data.babySize.forEach((size: any, index) => {
      form.append(`babySize[${index}].size`, size.size);
      form.append(`babySize[${index}].quantity`, size.quantity);
    });

    let { response } = await axios.post(baseUrl + "Baby/Add", form, {
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

export const getBabyItems = createAsyncThunk<
  GetAllBabyItemsModel,
  any,
  AppThunkConfig
>("/Baby/GetItems", async (thunkApi) => {
  try {
    let { data } = await axios.get(baseUrl + "Baby/GetItems", {
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
