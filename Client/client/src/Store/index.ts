import { configureCustomStore } from "./store";

export const store = configureCustomStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunkConfig = { dispatch: AppDispatch; state: RootState };

export * from "./Models";
export * from "./Slices";
export * from "./hooks";
// export * from './thunks';
// export * from './selectors';
