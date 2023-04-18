import { BaseState } from "../BaseState";
import { StatisticsModel } from "./StatisticsModel";

export interface StatisticsState extends BaseState {
  statistics: StatisticsModel;
  loadingStatistics: boolean;
}
