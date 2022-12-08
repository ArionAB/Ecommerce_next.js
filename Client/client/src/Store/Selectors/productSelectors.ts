import { RootState } from "..";
import { FiltersModel } from "../Models/Product/FiltersModel";

import { GetAllProductItemsModel } from "../Models/Product/GetAllProductItemsModel";

export const selectLoadingItems = (state: RootState): boolean =>
  state.product.loadingItems;

export const selectProductItems = (state: RootState): GetAllProductItemsModel =>
  state.product.productItems;

export const selectFilters = (state: RootState): FiltersModel =>
  state.product.filters;
