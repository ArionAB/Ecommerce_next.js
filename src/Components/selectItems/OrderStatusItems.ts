import { OrderStatusType } from "../../Store/Enums/Order/OrderStatusType";

export const OrderStatusItems = [
  { value: OrderStatusType.Pending, label: "Plasată" },
  { value: OrderStatusType.Shipped, label: "Procesată" },
  { value: OrderStatusType.Delivered, label: "Finalizată" },
  { value: OrderStatusType.Cancelled, label: "Anulată" },
];
