import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import styles from "../styles/cart.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const Cart = () => {
  return (
    <Container maxWidth="xl">
      <Box className={styles.yourCartBox}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          className={styles.yourCart}
        >
          Your Cart
        </Typography>
        <Typography className={styles.continueLink}>
          Continue shopping
        </Typography>
      </Box>
      <Box className={styles.cartBox}>
        <Typography>Your cart is empty</Typography>
        <Link href="/baby">
          <Button
            startIcon={<ShoppingCartIcon />}
            className={styles.continueBTN}
          >
            Continue shopping
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Cart;
