import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducers } from "./Slices";

export const configureCustomStore = () => {
  const rootReducer = combineReducers({
    ...reducers,
  });

  return configureStore({
    reducer: rootReducer,
  });
};
