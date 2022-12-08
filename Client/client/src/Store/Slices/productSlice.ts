import { createSlice } from "@reduxjs/toolkit";
import { ProductItemModel } from "../Models/Product/ProductItem";
import { ProductState } from "../Models/Product/BabyState";

import { getProductItems } from "../Thunks/babyThunks";

const initialState: ProductState = {
  actions: {},
  productItems: {
    productItems: new Array<ProductItemModel>(),
    totalItemsPerCategory: {
      bodysuits: 0,
      coveralls: 0,
    },
  },
  loadingItems: false,
  filters: {
    PageNumber: 0,
    PageSize: 10,
    ProductSize: [],
    SearchText: "",
    MinPrice: 0,
    MaxPrice: 0,
    ProductCategory: 0,
    SubcategoryType: 0,
  },
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    resetBabyState: () => initialState,
    setPageNumber: (state, action) => {
      state.filters.PageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.filters.PageSize = action.payload;
    },
    setProductSize: (state, action) => {
      state.filters.ProductSize = action.payload;
    },
    setSearchText: (state, action) => {
      state.filters.SearchText = action.payload;
    },
    setMinPrice: (state, action) => {
      state.filters.MinPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.MaxPrice = action.payload;
    },
    setProductCategory: (state, action) => {
      state.filters.ProductCategory = action.payload;
    },
    setSubcategoryType: (state, action) => {
      state.filters.SubcategoryType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductItems.pending, (state, action) => {
      state.loadingItems = true;
    }),
      builder.addCase(getProductItems.fulfilled, (state, action) => {
        (state.productItems = action.payload), (state.loadingItems = false);
      });
    builder.addCase(getProductItems.rejected, (state, action) => {
      state.loadingItems = false;
    });
  },
});

export const {
  resetBabyState,
  setPageNumber,
  setPageSize,
  setProductSize,
  setSearchText,
  setMinPrice,
  setMaxPrice,
  setProductCategory,
  setSubcategoryType,
} = productSlice.actions;
