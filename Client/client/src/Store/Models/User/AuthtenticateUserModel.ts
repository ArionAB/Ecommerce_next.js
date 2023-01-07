import { UserType } from "../../Enums/UserType";

export interface AutehticateUserModel {
  email: string;
  createdAt: string;
  jwtToken: string;
  userId: string;
  userType: UserType;
  username: string;
}
