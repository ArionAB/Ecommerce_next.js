import { useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";

import styles from "../styles/orders.module.scss";
import { OrdersHistory } from "../src/Components/orders-page/OrdersHistory";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { getOrders } from "../src/Store/Thunks/orderThunks";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";
import { selectGetOrders } from "../src/Store/Selectors/orderSelectors";

const Orders = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const orders = useAppSelector(selectGetOrders);

  console.log(orders);
  useEffect(() => {
    dispatch(
      getOrders({
        userId: currentUser?.userId,
      })
    );
    //eslint-disable-next-line
  }, [currentUser]);

  return (
    <Container className={styles.page_container}>
      <Typography variant="h4">Comenzile tale</Typography>
      <Grid container className={styles.container}>
        <Grid item md={4} className={styles.history_container}>
          <OrdersHistory />
        </Grid>
        <Grid item md={8} className={styles.orders_container}></Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
