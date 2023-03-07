import { PaymentMethodType } from "../../Enums/Order/PaymentMethodType";
import { StatusType } from "../../Enums/Order/StatusType";
import { ShippingAddressModel } from "../User/ShippingAddressModel";
import { OrderProductModel } from "./OrderProductModel";

export interface AddOrderModel {
  status: StatusType;
  paymentMethod: PaymentMethodType;
  orderProducts: OrderProductModel[];
  userId: string | undefined | null;
  address: ShippingAddressModel;
}
