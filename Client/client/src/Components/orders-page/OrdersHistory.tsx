import React from "react";
import { Typography, Box } from "@mui/material";
import styles from "../../../styles/ordersHistory.module.scss";
import { useAppSelector } from "../../Store";
import { selectGetOrders } from "../../Store/Selectors/orderSelectors";
import { OrderModel } from "../../Store/Models/Order/OrderModel";
import { ConvertStatusToLabel } from "../../Utils/Functions/ConvertEnum";
import {
  dateTimeFormatOptions,
  getDateLabel,
} from "../../Utils/Functions/dateTimeFormat";

export const OrdersHistory = () => {
  const orders = useAppSelector(selectGetOrders);

  const showStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return styles.pending;
      case 2:
        return styles.shipped;
      case 3:
        return styles.delivered;
      case 4:
        return styles.cancelled;
      default:
        return styles.pending;
    }
  };
  console.log(orders.orders);
  return (
    <Box className={styles.orders_history}>
      <Typography variant="h5">Istoricul comenzilor</Typography>
      {orders?.orders.map((order: OrderModel) => (
        <Box className={styles.order} key={order.orderId}>
          <span className={styles.order_id}>#{order.orderId}</span>
          <Box className={styles.row}>
            <Box className={styles.left_box}>
              <span className={styles.total_price}>{order.totalPrice} lei</span>
              <span className={styles.total_items}>
                {order.orderProducts.length} Produse
              </span>
            </Box>
            <Box className={styles.right_box}>
              <Box></Box>
              <span className={showStatusColor(Number(order.status))}>
                {ConvertStatusToLabel(Number(order.status))}
              </span>
              <span className={styles.date}>
                {getDateLabel(order.dateCreated, dateTimeFormatOptions)}
              </span>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
