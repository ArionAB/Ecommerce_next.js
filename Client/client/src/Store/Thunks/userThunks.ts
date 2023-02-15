import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { RegisterUserModel } from "../Models/User/RegisterUserModel";
import { ShippingAddressModel } from "../Models/User/ShippingAddressModel";
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

export const updateUser = createAsyncThunk<
  any,
  {
    token: string | undefined;
    data: ShippingAddressModel;
    sameAddress: boolean;
  },
  AppThunkConfig
>("Users/UpdateUser", async ({ token, data, sameAddress }, thunkAPI) => {
  try {
    let form = new FormData();
    form.append("firstName", data.firstName);
    form.append("lastName", data.lastName);
    form.append("address", data.address);
    form.append("info", data.info!);
    form.append("zipCode", data.zipCode);
    form.append("city", data.city);
    form.append("county", data.county);
    form.append("phone", data.phone);

    if (sameAddress) {
      form.append("firstNameBill", data.firstName);
      form.append("lastNameBill", data.lastName);
      form.append("addressBill", data.address);
      form.append("infoBill", data.info!);
      form.append("zipCodeBill", data.zipCode);
      form.append("cityBill", data.city);
      form.append("countyBill", data.county);
      form.append("phoneBill", data.phone);
    } else {
      form.append("firstNameBill", data.firstNameBill);
      form.append("lastNameBill", data.lastNameBill);
      form.append("addressBill", data.addressBill);
      form.append("infoBill", data.infoBill!);
      form.append("zipCodeBill", data.zipCodeBill);
      form.append("cityBill", data.cityBill);
      form.append("countyBill", data.countyBill);
      form.append("phoneBill", data.phoneBill);
    }

    let { response } = await axios.post(baseUrl + "Users/UpdateUser", form, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    let errorMessage = getAxiosErrorMessage(err);
    return thunkAPI.rejectWithValue(getAxiosErrorMessage(err));
  }
});
