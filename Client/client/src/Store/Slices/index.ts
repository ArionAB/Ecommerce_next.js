import { babySlice } from "./babySlice";
import { baseSlice } from "./baseSlice";

export const reducers = {
  base: baseSlice.reducer,
  baby: babySlice.reducer,
};
