import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseState } from "../Models/BaseState";

export const baseSlice = createSlice({
  name: "baseSlice",
  initialState: { actions: {}, payload: 0 } as BaseState,
  reducers: {
    setTemplateValue(state, action: PayloadAction<number>) {
      state.payload = action.payload;
    },
  },
});

export const { setTemplateValue } = baseSlice.actions;
