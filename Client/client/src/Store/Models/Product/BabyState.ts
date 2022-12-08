import { BaseState } from "../BaseState";
import { FiltersModel } from "./FiltersModel";

import { GetAllProductItemsModel } from "./GetAllProductItemsModel";

export interface ProductState extends BaseState {
  productItems: GetAllProductItemsModel;
  loadingItems: boolean;
  filters: FiltersModel;
}
