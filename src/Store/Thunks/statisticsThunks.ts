'use client'

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";

const axios = require("axios").default;

export const getStatistics = createAsyncThunk<
  any,
  { token: string | undefined | null },
  AppThunkConfig
>("getStatistics", async ({ token }, thunkApi) => {
  try {
    let { data } = await axios.get(baseUrl + "getStatistics", {
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
