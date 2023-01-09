import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { RegisterUserModel } from "../Models/User/RegisterUserModel";
import { resetProductState } from "../Slices/productSlice";

const axios = require("axios").default;

export const registerUser = createAsyncThunk<
  any,
  { data: RegisterUserModel },
  AppThunkConfig
>("/Users/Register", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("userName", data.name);
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("confirmPassword", data.confirmPassword);

    let { response } = await axios.post(baseUrl + "Users/Register", form, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});
export const loginUser = createAsyncThunk<
  any,
  { data: { email: string; password: string } },
  AppThunkConfig
>("/Users/Login", async ({ data }, thunkApi) => {
  try {
    let form = new FormData();
    form.append("email", data.email);
    form.append("password", data.password);

    let response = await axios.post(baseUrl + "Users/Login", form, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkApi.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const requestRefreshToken = createAsyncThunk<
  any,
  string,
  AppThunkConfig
>("Users/RefreshToken", async (token, thunkAPI) => {
  try {
    let { data } = await axios.post(
      baseUrl + "Users/RefreshToken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);

    return thunkAPI.rejectWithValue(getAxiosErrorMessage(err));
  }
});

export const requestLogout = createAsyncThunk<
  any,
  string | null | undefined,
  AppThunkConfig
>("auth/revokeToken", async (token, thunkAPI) => {
  try {
    let { data } = await axios.post(
      baseUrl + "Users/RevokeToken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    thunkAPI.dispatch(resetProductState());
    // thunkAPI.dispatch(resetContentState());
    // thunkAPI.dispatch(resetInterviewState());
    // thunkAPI.dispatch(resetUserState());

    return data.response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);

    return thunkAPI.rejectWithValue(getAxiosErrorMessage(err));
  }
});
