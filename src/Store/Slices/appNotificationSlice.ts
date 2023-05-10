import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppNotificationModel } from "../Models/appNotification/AppNotificationModel";
import { AppNotificationState } from "../Models/appNotification/AppNotificationState";

const initialState: AppNotificationState = {
  actions: {},
  notifications: new Array<AppNotificationModel>(),
};

export const appNotificationSlice = createSlice({
  name: "appNotificationSlice",
  initialState: initialState,
  reducers: {
    setAppNotifications(state, action: PayloadAction<AppNotificationModel[]>) {
      state.notifications = action.payload;
    },
    removeAppNotification(state) {
      if (
        state.notifications &&
        state.notifications.length >= 1 &&
        state.notifications[0].isOpen === false
      ) {
        if (state.notifications.length === 1) {
          state.notifications = [];
        } else {
          state.notifications.splice(0, 1);
          state.notifications[0].isOpen = true;
        }
      }
    },
    addAppNotification(state, action: PayloadAction<AppNotificationModel>) {
      if (state.notifications.length < 1) {
        state.notifications.push({ ...action.payload, isOpen: true });
      } else {
        state.notifications.push({ ...action.payload, isOpen: false });
      }
    },
    closeNotificationById(state, action: PayloadAction<number>) {
      state.notifications[action.payload].isOpen = false;
    },
    showNotificationById(state, action: PayloadAction<number>) {
      state.notifications[action.payload].isOpen = true;
    },
  },
});

export const {
  setAppNotifications,
  removeAppNotification,
  addAppNotification,
  closeNotificationById,
  showNotificationById,
} = appNotificationSlice.actions;
