import { OrderStatusType } from "../../Enums/Order/OrderStatusType";

export interface ChangeOrderStatusModel {
  orderId: string;
  status: OrderStatusType;
}
