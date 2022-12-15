import { RootState } from "..";
import { FiltersModel } from "../Models/Product/FiltersModel";

import { GetAllProductItemsModel } from "../Models/Product/GetAllProductItemsModel";
import { ProductItemModel } from "../Models/Product/ProductItem";

export const selectLoadingItems = (state: RootState): boolean =>
  state.product.loadingItems;

export const selectProductItems = (state: RootState): GetAllProductItemsModel =>
  state.product.productItems;

export const selectFilters = (state: RootState): FiltersModel =>
  state.product.filters;

export const selectPaginatedItems = (
  state: RootState
): GetAllProductItemsModel => state.product.paginatedItems;

export const selectProductItem = (state: RootState): ProductItemModel =>
  state.product.item;
