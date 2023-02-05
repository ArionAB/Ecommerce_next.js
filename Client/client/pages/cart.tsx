import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
} from "@mui/material";
import styles from "../styles/cart.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../src/Store";
import {
  selectCartItems,
  selectTotalPrice,
} from "../src/Store/Selectors/cartSelectors";
import { resourceUrl } from "../src/Utils";
import { ConvertSizeToLabel } from "../src/Utils/Functions/ConvertEnum";
import { QuantitySizeItems } from "../src/Components/selectItems/QuantitySizeItems";
import { changeQuantity, removeItem } from "../src/Store/Thunks/cartThunks";
import Close from "@mui/icons-material/Close";
import { SizeType } from "../src/Store/Enums/SizeType";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";

const Cart = () => {
  const [selectValues, setSelectValues] = useState([
    {
      cartProductId: "",
      quantity: 1,
    },
  ]);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const currentUser = useAppSelector(selectCurrentUser);
  const totalPrice = useAppSelector(selectTotalPrice);

  const isNotEmpty = () => cartItems.length > 0;

  const handleChange = (event: any, index: number, cartProductId: string) => {
    const newValues = [...selectValues];
    newValues[index].quantity = Number(event.target.value);
    newValues[index].cartProductId = cartProductId;
    setSelectValues(newValues);
    dispatch(
      changeQuantity({
        data: {
          cartProductId: cartProductId,
          quantity: Number(event.target.value),
        },
        token: currentUser?.jwtToken,
      })
    );
  };

  useEffect(() => {
    const newValues: any = [...selectValues];
    cartItems?.forEach((item, index) => {
      newValues[index] = {
        productId: item.cartProductId,
        quantity: Number(item.quantity),
      };
      setSelectValues(newValues);
    });
    //eslint-disable-next-line
  }, [cartItems]);

  const handleRemoveItem = (cartProductId: string, sizeType: SizeType) => {
    dispatch(
      removeItem({
        data: {
          productId: cartProductId,
          sizeType: sizeType,
        },
        token: currentUser?.jwtToken,
      })
    );
  };

  const priceWithDelivery = () => {
    if (totalPrice < 200) {
      return totalPrice + 15;
    } else {
      return totalPrice;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className={styles.yourCartBox}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          className={styles.yourCart}
        >
          Coș
        </Typography>
        {isNotEmpty() ? (
          <Box className={styles.priceBox}>
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: "1rem" }}>
                Total
              </Typography>
              <Typography className={styles.totalPrice}>
                {priceWithDelivery()} lei
              </Typography>
            </Box>
            <Link href="/checkout">
              <Button variant="contained">Finzalizează comandă</Button>
            </Link>
          </Box>
        ) : (
          <>
            {" "}
            <Typography className={styles.continueLink}>
              Continue shopping
            </Typography>
          </>
        )}
      </Box>
      <Box
        className={isNotEmpty() ? styles.cartBox : styles.emptyCartBox}
        sx={{ border: isNotEmpty() ? "none" : "1px solid #e3e3e3" }}
      >
        {isNotEmpty() ? (
          cartItems?.map((item, index) => {
            return (
              <Box className={styles.cartItemBox} key={item.cartProductId}>
                <Box className={styles.leftSection}>
                  <img
                    src={resourceUrl + item.productPictures[0].filePath}
                    alt={item.title}
                    className={styles.picture}
                  />
                  <Box className={styles.titlePriceSize}>
                    <Typography variant="h5" className={styles.title}>
                      {item.title}
                    </Typography>
                    <Typography className={styles.price}>
                      Pret: {item.priceKg} lei
                    </Typography>
                    <Typography className={styles.size}>
                      Marime: {ConvertSizeToLabel(item.sizeType)}
                    </Typography>
                  </Box>
                </Box>
                <Box className={styles.selectSizeBox}>
                  <FormControl className={styles.selectSize}>
                    <InputLabel id="demo-simple-select-label">
                      Nr. bucăți
                    </InputLabel>
                    <Select
                      id="demo-simple-select-label"
                      // @ts-ignore
                      value={Number(selectValues[index]?.quantity)}
                      onChange={(e) =>
                        handleChange(e, index, item.cartProductId)
                      }
                      label="Nr. bucati"
                      defaultValue="1"
                    >
                      {QuantitySizeItems.map((size, index) => (
                        <MenuItem key={index} value={size.value}>
                          {size.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography className={styles.cost}>{`${
                    Number(item.priceKg) * Number(item.quantity)
                  } lei`}</Typography>
                  <Close
                    className={styles.closeIcon}
                    onClick={() =>
                      handleRemoveItem(item.cartProductId, item.sizeType)
                    }
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <>
            <Typography>Your cart is empty</Typography>
            <Link href="/">
              <Button
                startIcon={<ShoppingCartIcon />}
                className={styles.continueBTN}
              >
                Continue shopping
              </Button>
            </Link>{" "}
          </>
        )}
      </Box>
      <Divider />
      <Box className={styles.bottom}>
        <Typography variant="subtitle2">
          Livrare gratuită la comenzile peste 200 de lei
        </Typography>
        <Box>Cost livrare: {totalPrice >= 200 ? 0 : 15} lei</Box>
        <Box className={styles.totalBox}>
          <Typography variant="h5" className={styles.total}>
            Total
          </Typography>
          <Typography className={styles.totalPrice}>
            {priceWithDelivery()} lei
          </Typography>
        </Box>

        <Link href="/checkout">
          <Button variant="contained" className={styles.btn}>
            Finzalizează comanda
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Cart;
