import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkConfig } from "..";
import { RequestPaymentModel } from "../Models/payment/RequestPaymentModel";
import { baseUrl, getAxiosErrorMessage } from "../../Utils";
import { GoToPaymentModel } from "../Models/payment/GoToPaymentModel";
import { addAppNotification } from "../Slices/appNotificationSlice";

const axios = require("axios").default;

export const goToPayment = createAsyncThunk<
    RequestPaymentModel,
    { data: GoToPaymentModel; token: string | undefined },
    AppThunkConfig
>("interview/goToPayment", async (requestData, thunkAPI) => {

    try {
        let { data } = await axios.post(
            baseUrl + "Payment/GoToPayment",
            requestData.data,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${requestData.token}`,
                },
            }
        );
        return data.response;
    } catch (error: any) {
        let errorMessage = getAxiosErrorMessage(error);
        if (errorMessage) {
            thunkAPI.dispatch(
                addAppNotification({
                    message: errorMessage,
                    severity: "error",
                })
            );
            return thunkAPI.rejectWithValue(getAxiosErrorMessage(error));
        } else {
            throw error;
        }
    }
});
