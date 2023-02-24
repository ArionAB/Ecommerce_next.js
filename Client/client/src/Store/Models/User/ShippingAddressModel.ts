export interface ShippingAddressModel {
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
  orderId?: string;
  orderAddressId?: string;
}
