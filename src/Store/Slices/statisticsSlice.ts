import { createSlice } from "@reduxjs/toolkit";
import { FruitType } from "../Enums/Product/FruitType";
import { HoneyType } from "../Enums/Product/HoneyType";
import { SizeType } from "../Enums/SizeType";
import { StatisticsState } from "../Models/Statistics/StatisticsState";
import { getStatistics } from "../Thunks/statisticsThunks";

const initialState: StatisticsState = {
  actions: {},
  statistics: {
    abandonedCartRate: 0,
    averageOrderValue: 0,
    customerRetentionRate: 0,
    mostSoldHoneyType: new Array<{
      productCategory: HoneyType;
      totalOrders: 0;
      totalQuantity: 0;
    }>(),
    mostSoldSizeType: new Array<{
      sizeType: SizeType;
      totalOrders: 0;
      totalQuantity: 0;
    }>(),
    productSales: new Array<{
      fruitType: FruitType;
      mixedFruitId: string | null;
      productCateogry: HoneyType;
      productId: string;
      quantity: 0;
      salesCount: 0;
      sizeType: SizeType;
      title: string;
    }>(),
  },
  loadingStatistics: false,
};

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState: initialState,
  reducers: {
    resetStatisticsState: () => initialState,
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatistics.pending, (state, action) => {
      state.loadingStatistics = true;
    });
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
      state.loadingStatistics = false;
    });
    builder.addCase(getStatistics.rejected, (state, action) => {
      state.loadingStatistics = false;
    });
  },
});

export const { resetStatisticsState, setStatistics } = statisticsSlice.actions;
