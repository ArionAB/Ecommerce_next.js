import { RootState } from "..";
import { AppNotificationModel } from "../Models/appNotification/AppNotificationModel";

export const selectAppNotifications = (
  state: RootState
): AppNotificationModel[] => state.notification.notifications;
