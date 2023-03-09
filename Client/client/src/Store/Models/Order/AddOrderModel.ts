import { PaymentMethodType } from "../../Enums/Order/PaymentMethodType";
import { OrderStatusType } from "../../Enums/Order/OrderStatusType";
import { ShippingAddressModel } from "../User/ShippingAddressModel";
import { OrderProductModel } from "./OrderProductModel";

export interface AddOrderModel {
  status: OrderStatusType;
  paymentMethod: PaymentMethodType;
  orderProducts: OrderProductModel[];
  userId: string | undefined | null;
  address: ShippingAddressModel;
}
