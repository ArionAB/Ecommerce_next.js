import { useEffect, useState } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

import styles from "../styles/orders.module.scss";
import { OrdersHistory } from "../src/Components/orders-page/OrdersHistory";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { getOrders } from "../src/Store/Thunks/orderThunks";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";
import {
  selectGetOrders,
  selectOrdersFilters,
} from "../src/Store/Selectors/orderSelectors";
import { OrderDetails } from "../src/Components/orders-page/OrderDetails";
import { OrderModel } from "../src/Store/Models/Order/OrderModel";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const filters = useAppSelector(selectOrdersFilters);
  const getPaginatedOrders = () => {
    return dispatch(
      getOrders({
        token: currentUser?.jwtToken,
        filters: filters,
      })
    );
  };

  useEffect(() => {
    let promise = getPaginatedOrders();
    return () => promise.abort();
    //eslint-disable-next-line
  }, [filters, currentUser]);

  return (
    <Container className={styles.page_container}>
      <Grid container className={styles.container}>
        <Grid item md={4} className={styles.history_container}>
          <OrdersHistory setSelectedOrder={setSelectedOrder} />
        </Grid>
        <Grid item md={8} className={styles.orders_container}>
          <OrderDetails selectedOrder={selectedOrder} />
          <Box className={styles.order_info}>
            <Typography variant="h5" className={styles.title}>
              Informații despre comanda
            </Typography>
            <Box className={styles.between}>
              <Typography className={styles.left}>Nume</Typography>
              <Typography className={styles.right}>
                {selectedOrder?.shippingAddress?.firstName}{" "}
                {selectedOrder?.shippingAddress?.lastName}
              </Typography>
            </Box>
            <Box className={styles.between}>
              <Typography className={styles.left}>Număr telefon</Typography>
              <Typography className={styles.right}>
                {selectedOrder?.shippingAddress?.phoneBill}
              </Typography>
            </Box>
            <Box className={styles.between}>
              <Typography className={styles.left}>Adresa de livrare</Typography>
              <Typography className={styles.right}>
                {selectedOrder?.shippingAddress?.address},{" "}
                {selectedOrder?.shippingAddress?.city},{" "}
                {selectedOrder?.shippingAddress?.county}
              </Typography>
            </Box>
            <Box className={styles.total}>
              <Typography className={styles.left}>Total</Typography>
              <Typography className={styles.right}>
                {selectedOrder?.totalPrice} lei
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
