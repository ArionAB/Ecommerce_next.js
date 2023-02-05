import { BaseState } from "../BaseState";
import { FiltersModel } from "./FiltersModel";

import { ProductItemModel } from "./ProductItem";

export interface ProductState extends BaseState {
  productItems: ProductItemModel[];
  loadingItems: boolean;
  loadingItem: boolean;
  filters: FiltersModel;
  item: ProductItemModel;
}
