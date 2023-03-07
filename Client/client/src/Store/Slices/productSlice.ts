import { createSlice } from "@reduxjs/toolkit";
import { ProductItemModel } from "../Models/Product/ProductItem";
import { ProductState } from "../Models/Product/ProductState";

import {
  getPaginatedProductItems,
  getProduct,
  getProductItems,
} from "../Thunks/productThunks";

const initialState: ProductState = {
  actions: {},
  productItems: new Array<ProductItemModel>(),

  loadingItems: false,
  loadingItem: false,
  filters: {
    PageNumber: 0,
    PageSize: 10,
    SearchText: "",
    MinPrice: 0,
    MaxPrice: 0,
    ProductCategory: 1,
    SubcategoryType: 1,
  },
  item: {
    productId: "",
    cartProductId: "",
    productPictures: [],
    priceKg: "",
    priceHalf: "",
    description: "",
    title: "",
    productCategory: 0,
    quantity: "",
    totalCategoryItems: "",
    fruitType: "",
    sizeType: 0,
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
    setProductItem: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductItems.pending, (state, action) => {
      state.loadingItems = true;
    }),
      builder.addCase(getProductItems.fulfilled, (state, action) => {
        (state.productItems = action.payload.productItems),
          (state.loadingItems = false);
      });
    builder.addCase(getProductItems.rejected, (state, action) => {
      state.loadingItems = false;
    }),
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
  setProductItem,
  setSearchText,
  setMinPrice,
  setMaxPrice,
  setProductCategory,
  setSubcategoryType,
} = productSlice.actions;
