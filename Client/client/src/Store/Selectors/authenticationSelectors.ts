import { RootState } from "..";
import { AutehticateUserModel } from "../Models/User/AuthtenticateUserModel";

export const selectCurrentUser = (
  state: RootState
): AutehticateUserModel | null | undefined => state.authentication.currentUser;
export const selectIsRefreshing = (state: RootState): boolean =>
  state.authentication.isRefreshing;
export const selectIsSilentRefresh = (state: RootState): boolean =>
  state.authentication.isSilentRefresh;
export const selectIsLoggingIn = (state: RootState): boolean =>
  state.authentication.userIsLoggingIn;
export const selectUserEmail = (state: RootState): any =>
  state.authentication.userEmail;
export const selectVerifyEmailSuccess = (state: RootState): boolean =>
  state.authentication.verifyEmailSuccess;
