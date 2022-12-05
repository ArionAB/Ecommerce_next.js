import { BaseState } from "../BaseState";
import { BabyItemModel } from "./BabyItem";
import { GetAllBabyItemsModel } from "./GetAllBabyItemsModel";

export interface BabyState extends BaseState {
  babyItems: GetAllBabyItemsModel;
  loadingItems: boolean;
}
