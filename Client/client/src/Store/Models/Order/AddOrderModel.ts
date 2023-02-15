import { PaymentMethodType } from "../../Enums/Order/PaymentMethodType";
import { StatusType } from "../../Enums/Order/StatusType";
import { OrderProductModel } from "./OrderProductModel";

export interface AddOrderModel {
  status: StatusType;
  paymentMethod: PaymentMethodType;
  orderProducts: OrderProductModel[];
}
