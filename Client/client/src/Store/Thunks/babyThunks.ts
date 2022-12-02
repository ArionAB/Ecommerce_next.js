import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { AddBabyItemModel } from "../Models/Baby/AddBabyItem";

const axios = require("axios").default;

export const addBabyItem = createAsyncThunk<
  any,
  { data: AddBabyItemModel },
  AppThunkConfig
>("Baby/Add", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("Price", data.price);
    form.append("BabySize", data.babySize);
    form.append("Description", data.description);
    form.append("Title", data.title);
    form.append("CategoryType", data.categoryType);
    form.append("Quantity", data.quantity);
    data.pictures.forEach((picture: any, index) =>
      form.append(`Pictures${index}`, picture)
    );

    let { response } = await axios.post(baseUrl + "Baby/Add", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
