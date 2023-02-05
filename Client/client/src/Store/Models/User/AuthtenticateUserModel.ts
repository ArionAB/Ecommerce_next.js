import { UserType } from "../../Enums/UserType";

export interface AutehticateUserModel {
  email: string;
  createdAt: string;
  jwtToken: string;
  userId: string;
  userType: UserType;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  info: string | undefined;
  zipCode: string;
  city: string;
  county: string;
  phone: string;
  firstNameBill: string;
  lastNameBill: string;
  addressBill: string;
  infoBill: string | undefined;
  zipCodeBill: string;
  cityBill: string;
  countyBill: string;
  phoneBill: string;
}
