import { UserType } from "../../Enums/UserType";

export interface AutehticateUserModel {
  email: string;
  createdAt: string;
  jwtToken: string;
  userId: string;
  userType: UserType;
  userName: string;
  firstName: string;
  lastName: string;
  address: string;
  info: string | undefined;
  zipCode: number;
  city: string;
  county: string;
  phone: string;
  firstNameBill: string;
  lastNameBill: string;
  addressBill: string;
  infoBill: string | undefined;
  zipCodeBill: number;
  cityBill: string;
  countyBill: string;
  phoneBill: string;
}
