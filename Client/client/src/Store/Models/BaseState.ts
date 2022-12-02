import { BaseActionResult } from "./common";

export interface BaseState {
  actions: {
    [actionId: string]: {
      [requestId: string]: BaseActionResult;
    };
  };
  payload?: number;
}
