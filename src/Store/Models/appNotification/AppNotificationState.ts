import { BaseState } from "../BaseState";
import { AppNotificationModel } from "./AppNotificationModel";

export interface AppNotificationState extends BaseState {
  notifications: AppNotificationModel[];
}
