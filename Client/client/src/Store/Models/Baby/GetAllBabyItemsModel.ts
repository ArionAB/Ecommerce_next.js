import { BabyItemModel } from "./BabyItem";
import { BabyItemsCategoryModel } from "./BabyItemsCategoryModel";

export interface GetAllBabyItemsModel {
  babyItems: BabyItemModel[];
  totalItemsPerCategory: BabyItemsCategoryModel;
}
