import { BaseState } from "../BaseState";
import { FiltersModel } from "./FiltersModel";

import { GetAllProductItemsModel } from "./GetAllProductItemsModel";
import { ProductItemModel } from "./ProductItem";

export interface ProductState extends BaseState {
  productItems: GetAllProductItemsModel;
  paginatedItems: GetAllProductItemsModel;
  loadingItems: boolean;
  loadingItem: boolean;
  filters: FiltersModel;
  item: ProductItemModel;
}
