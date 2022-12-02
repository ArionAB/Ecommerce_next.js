import { createSlice } from "@reduxjs/toolkit";
import { BabyItemModel } from "../Models/Baby/BabyItem";
import { BabyState } from "../Models/Baby/BabyState";
import { addBabyItem } from "../Thunks/babyThunks";

const initialState: BabyState = {
  actions: {},
  babyItems: new Array<BabyItemModel>(),
  loadingItems: false,
};
