import { BaseState } from "../BaseState";
import { BabyItemModel } from "./BabyItem";

export interface BabyState extends BaseState {
  babyItems: BabyItemModel[];
  loadingItems: boolean;
}
