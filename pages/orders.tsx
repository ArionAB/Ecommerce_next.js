'use client'
import dynamic from "next/dynamic"

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Drawer,
  CircularProgress,
} from "@mui/material";

import styles from "../styles/orders.module.scss";

import { useAppDispatch, useAppSelector } from "../src/Store";
import { getOrders } from "../src/Store/Thunks/orderThunks";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";
import {
  selectGetOrders,
  selectOrdersFilters,
} from "../src/Store/Selectors/orderSelectors";

import { OrderModel } from "../src/Store/Models/Order/OrderModel";
import withAuth from "../src/Utils/ProtectedRoutes/WithAuth";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

//@ts-ignore
const OrderDetails = dynamic (()=> import("../src/Components/orders-page/OrderDetails"), {ssr: false}, {loading: <CircularProgress />} )
//@ts-ignore
const OrdersHistory = dynamic (()=> import("../src/Components/orders-page/OrdersHistory"), {ssr: false}, {loading: <CircularProgress />} )


const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const orders = useAppSelector(selectGetOrders);
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
      {!orders.orders.length ? (
        <Box className={styles.noOrders}>
          <Typography variant="h3" textAlign="center">
            Nu aveți nici o comandă.{" "}
          </Typography>
          <Link href="/">
            <Button
              startIcon={<ShoppingCartIcon />}
              className={styles.continueBTN}
            >
              Continuă cumpărăturile
            </Button>
          </Link>{" "}
        </Box>
      ) : (
        <>
          <Button
            className={styles.drawerBTN}
            onClick={() => setOpenDrawer(true)}
            endIcon={<KeyboardDoubleArrowRightIcon />}
          >
            Instoricul comenzilor
          </Button>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <OrdersHistory
              setSelectedOrder={setSelectedOrder}
              setOpenDrawer={setOpenDrawer}
            />
          </Drawer>
          <Grid container className={styles.container}>
            <Grid item md={4} className={styles.history_container}>
              <OrdersHistory
                setSelectedOrder={setSelectedOrder}
                setOpenDrawer={setOpenDrawer}
              />
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
                    {selectedOrder?.shippingAddress?.phone}
                  </Typography>
                </Box>
                <Box className={styles.between}>
                  <Typography className={styles.left}>
                    Adresa de livrare
                  </Typography>
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
        </>
      )}
    </Container>
  );
};

export default withAuth(Orders, false);
