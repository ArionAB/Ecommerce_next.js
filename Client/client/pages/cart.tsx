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
import {
  changeQuantity,
  getCartItems,
  removeItem,
} from "../src/Store/Thunks/cartThunks";
import Close from "@mui/icons-material/Close";
import { SizeType } from "../src/Store/Enums/SizeType";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";
import { setCartItems } from "../src/Store/Slices/cartSlice";

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

  const isNotEmpty = () => cartItems?.length > 0;

  const handleChange = (
    event: any,
    index: number,
    cartProductId: string,
    productId: string,
    sizeType: SizeType
  ) => {
    const newValues = [...selectValues];
    newValues[index].quantity = Number(event.target.value);
    newValues[index].cartProductId = cartProductId;
    setSelectValues(newValues);
    if (currentUser) {
      dispatch(
        changeQuantity({
          data: {
            cartProductId: cartProductId,
            quantity: Number(event.target.value),
          },
          token: currentUser?.jwtToken,
        })
      ).then(() => {
        dispatch(
          getCartItems({
            token: currentUser?.jwtToken,
          })
        );
      });
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCartItems = cartItems.map((item: any) => {
        if (item.productId === productId && item.sizeType === sizeType) {
          return {
            ...item,
            quantity: Number(event.target.value),
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      dispatch(setCartItems(newCartItems));
    }
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

  const handleRemoveItem = (
    cartProductId: string,
    sizeType: SizeType,
    productId?: string
  ) => {
    if (currentUser) {
      dispatch(
        removeItem({
          data: {
            productId: cartProductId,
            sizeType: sizeType,
          },
          token: currentUser?.jwtToken,
        })
      ).then(() => {
        dispatch(
          getCartItems({
            token: currentUser?.jwtToken,
          })
        );
      });
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCartItems = cartItems.filter((item: any) =>
        item.productId !== productId
          ? true
          : Number(item.sizeType) !== sizeType
          ? true
          : false
      );

      localStorage.setItem("cart", JSON.stringify(newCartItems));
      dispatch(setCartItems(newCartItems));
    }
  };

  const TotalPrice = cartItems?.reduce(
    (acc, item) => acc + Number(item.priceKg) * Number(item.quantity),
    0
  );

  const priceWithDelivery = () => {
    if (TotalPrice < 200) {
      return TotalPrice + 15;
    } else {
      return TotalPrice;
    }
  };

  return (
    <Container maxWidth="xl" className={styles.page_container}>
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
          <Link href="/">
            <Typography className={styles.continueLink}>
              Continuă cumpărăturile
            </Typography>
          </Link>
        )}
      </Box>
      <Box
        className={isNotEmpty() ? styles.cartBox : styles.emptyCartBox}
        sx={{ border: isNotEmpty() ? "none" : "1px solid #e3e3e3" }}
      >
        {isNotEmpty() ? (
          cartItems?.map((item, index) => {
            return (
              <Box
                className={styles.cartItemBox}
                key={item.productId + item.sizeType + item.fruitType}
              >
                <Box className={styles.leftSection}>
                  <img
                    src={resourceUrl + item.productPictures[0]?.filePath}
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
                      value={Number(selectValues[index]?.quantity) || 1}
                      onChange={(e) =>
                        handleChange(
                          e,
                          index,
                          item.cartProductId,
                          item.productId,
                          item.sizeType
                        )
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
                      handleRemoveItem(
                        item.cartProductId,
                        item.sizeType,
                        item.productId
                      )
                    }
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <>
            <Typography>Coșul tău de cumpărături este gol!</Typography>
            <Link href="/">
              <Button
                startIcon={<ShoppingCartIcon />}
                className={styles.continueBTN}
              >
                Continuă cumpărăturile
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
        <Box>Cost livrare: {priceWithDelivery() >= 200 ? 0 : 15} lei</Box>
        <Box className={styles.totalBox}>
          <Typography variant="h5" className={styles.total}>
            Total
          </Typography>
          <Typography className={styles.totalPrice}>
            {priceWithDelivery()} lei
          </Typography>
        </Box>

        {isNotEmpty() ? (
          <Link href="/checkout">
            <Button variant="contained" className={styles.btn}>
              Finalizează comanda
            </Button>
          </Link>
        ) : (
          <Link href="/">
            <Button variant="contained" className={styles.btn}>
              Continuă cumpărăturile
            </Button>
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
