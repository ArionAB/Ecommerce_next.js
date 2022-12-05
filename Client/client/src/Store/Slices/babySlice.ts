import { createSlice } from "@reduxjs/toolkit";
import { BabyItemModel } from "../Models/Baby/BabyItem";
import { BabyState } from "../Models/Baby/BabyState";
import { GetAllBabyItemsModel } from "../Models/Baby/GetAllBabyItemsModel";
import { addBabyItem, getBabyItems } from "../Thunks/babyThunks";

const initialState: BabyState = {
  actions: {},
  babyItems: {
    babyItems: new Array<BabyItemModel>(),
    totalItemsPerCategory: {
      bodysuits: 0,
      coveralls: 0,
    },
  },
  loadingItems: false,
};

export const babySlice = createSlice({
  name: "babySlice",
  initialState: initialState,
  reducers: {
    resetBabyState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getBabyItems.pending, (state, action) => {
      state.loadingItems = true;
    }),
      builder.addCase(getBabyItems.fulfilled, (state, action) => {
        (state.babyItems = action.payload), (state.loadingItems = false);
      });
    builder.addCase(getBabyItems.rejected, (state, action) => {
      state.loadingItems = false;
    });
  },
});
