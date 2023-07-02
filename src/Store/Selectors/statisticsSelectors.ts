import { RootState } from "..";

export const selectStatistics = (state: RootState): any => {
  return state.statistics.statistics;
};

export const selectLoadingStatistics = (state: RootState): boolean => {
  return state.statistics.loadingStatistics;
};
