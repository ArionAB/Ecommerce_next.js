import { createSlice } from "@reduxjs/toolkit";
import { ProductItemModel } from "../Models/Product/ProductItem";
import { ProductState } from "../Models/Product/BabyState";

import {
  getPaginatedProductItems,
  getProduct,
  getProductItems,
} from "../Thunks/productThunks";

const initialState: ProductState = {
  actions: {},
  productItems: {
    productItems: new Array<ProductItemModel>(),
    totalItemsPerCategory: {
      bodysuits: 0,
      coveralls: 0,
    },
  },
  paginatedItems: {
    productItems: new Array<ProductItemModel>(),
    totalItemsPerCategory: {
      bodysuits: 0,
      coveralls: 0,
    },
  },
  loadingItems: false,
  loadingItem: false,
  filters: {
    PageNumber: 0,
    PageSize: 10,
    ProductSize: [],
    SearchText: "",
    MinPrice: 0,
    MaxPrice: 0,
    ProductCategory: 1,
    SubcategoryType: 1,
  },
  item: {
    productId: "",
    productSizes: [],
    productPictures: [],
    price: "",
    description: "",
    title: "",
    categoryType: "",
    quantity: "",
    totalCategoryItems: "",
    totalSize: "",
  },
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    resetProductState: () => initialState,
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
    }),
      builder.addCase(getPaginatedProductItems.pending, (state, action) => {
        state.loadingItems = true;
      }),
      builder.addCase(getPaginatedProductItems.fulfilled, (state, action) => {
        (state.paginatedItems = action.payload), (state.loadingItems = false);
      });
    builder.addCase(getPaginatedProductItems.rejected, (state, action) => {
      state.loadingItems = false;
    });
    builder.addCase(getProduct.pending, (state, action) => {
      state.loadingItem = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.item = action.payload;
      state.loadingItem = false;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loadingItem = false;
    });
  },
});

export const {
  resetProductState,
  setPageNumber,
  setPageSize,
  setProductSize,
  setSearchText,
  setMinPrice,
  setMaxPrice,
  setProductCategory,
  setSubcategoryType,
} = productSlice.actions;
