import { ShippingAddressModel } from "../User/ShippingAddressModel";
import { OrderModel } from "./OrderModel";

export interface GetOrdersModel {
  shippingAddress: ShippingAddressModel;
  orders: OrderModel[];
}
