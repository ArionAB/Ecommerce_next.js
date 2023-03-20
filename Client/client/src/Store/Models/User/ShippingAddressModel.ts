export interface ShippingAddressModel {
  firstName: string;
  lastName: string;
  email: string;
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
  orderId?: string;
  orderAddressId?: string;
}
