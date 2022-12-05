import { RootState } from "..";

import { GetAllBabyItemsModel } from "../Models/Baby/GetAllBabyItemsModel";

export const selectLoadingItems = (state: RootState): boolean =>
  state.baby.loadingItems;

export const selectBabyItems = (state: RootState): GetAllBabyItemsModel =>
  state.baby.babyItems;
