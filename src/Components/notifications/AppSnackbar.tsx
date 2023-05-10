import { Alert, Slide, Snackbar, SnackbarCloseReason } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store";
import { selectAppNotifications } from "../../Store/Selectors/appNotificationSelectors";
import {
  closeNotificationById,
  removeAppNotification,
} from "../../Store/Slices/appNotificationSlice";

const AppSnackbar: FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAppNotifications);

  const [slide] = useState<
    React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >
  >(Slide);

  const handleClose = (index: number, reason: SnackbarCloseReason) => {
    if (reason !== "clickaway") {
      dispatch(closeNotificationById(0));
      setTimeout(() => {
        dispatch(removeAppNotification());
      }, 500);
    }
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={`snack-key-${index}`}
          open={notification.isOpen}
          autoHideDuration={3000}
          onClose={(_, reason) => handleClose(index, reason)}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          TransitionComponent={slide}
        >
          <Alert
            severity={notification.severity}
            sx={{ width: "100%" }}
            onClose={() => handleClose(index, "timeout")}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default AppSnackbar;
