import { FC, useState } from "react";
import { Typography, Box, Stack, Pagination } from "@mui/material";
import styles from "../../../styles/ordersHistory.module.scss";
import { useAppDispatch, useAppSelector } from "../../Store";
import { selectGetOrders } from "../../Store/Selectors/orderSelectors";
import { OrderModel } from "../../Store/Models/Order/OrderModel";
import { ConvertStatusToLabel } from "../../Utils/Functions/ConvertEnum";
import { selectOrdersFilters } from "../../Store/Selectors/orderSelectors";
import {
  dateTimeFormatOptions,
  getDateLabel,
} from "../../Utils/Functions/dateTimeFormat";
import { setOrdersFilters } from "../../Store/Slices/orderSlice";

export const OrdersHistory: FC<{ setSelectedOrder: Function }> = ({
  setSelectedOrder,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const orders = useAppSelector(selectGetOrders);
  const filters = useAppSelector(selectOrdersFilters);
  const dispatch = useAppDispatch();

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

  const handlePageChange = (event: any, page: number) => {
    if (page - 1 !== filters.pageNumber) {
      dispatch(
        setOrdersFilters({
          ...filters,
          pageNumber: page - 1,
        })
      );
    }
  };

  return (
    <>
      <Box className={styles.orders_history}>
        <Typography variant="h5" className={styles.history}>
          Istoricul comenzilor
        </Typography>
        {orders &&
          orders.orders.map((order: OrderModel) => (
            <Box
              className={styles.order}
              key={order.orderId}
              onClick={() => {
                setSelectedOrder(order);
                setSelectedOrderId(order.orderId);
              }}
              sx={
                order.orderId === selectedOrderId
                  ? {
                      backgroundColor: "aliceBlue",
                      borderLeft: "3px solid #356aee",
                    }
                  : { backgroundColor: "#fff" }
              }
            >
              <span className={styles.order_id}>#{order.orderId}</span>
              <Box className={styles.row}>
                <Box className={styles.left_box}>
                  <span className={styles.total_price}>
                    {order.totalPrice} lei
                  </span>
                  <span className={styles.total_items}>
                    {order.totalProducts} Produse
                  </span>
                </Box>
                <Box className={styles.right_box}>
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

      <Stack spacing={2} className={styles.pagination}>
        <Pagination
          page={filters.pageNumber + 1}
          count={orders.totalPages + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </>
  );
};
