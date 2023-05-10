import { BaseState } from "../BaseState";
import { AutehticateUserModel } from "./AuthtenticateUserModel";

export interface AuthenticationState extends BaseState {
  currentUser: AutehticateUserModel | null | undefined;
  isRefreshing: boolean;
  isSilentRefresh: boolean;
  userIsLoggingIn: boolean;
  userEmail: string;
  verifyEmailSuccess: boolean;
}
