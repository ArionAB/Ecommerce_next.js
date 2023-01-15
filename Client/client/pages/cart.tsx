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
} from "@mui/material";
import styles from "../styles/cart.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { selectCartItems } from "../src/Store/Selectors/cartSelectors";
import { resourceUrl } from "../src/Utils";
import { ConvertSizeToLabel } from "../src/Utils/Functions/ConvertEnumToNumber";
import { style } from "@mui/system";
import { QuantitySizeItems } from "../src/Components/selectItems/QuantitySizeItems";
import { changeQuantity, removeItem } from "../src/Store/Thunks/cartThunks";
import Close from "@mui/icons-material/Close";
import { SizeType } from "../src/Store/Enums/SizeType";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";

const Cart = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectValues, setSelectValues] = useState([
    {
      productId: "",
      quantity: 1,
    },
  ]);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const currentUser = useAppSelector(selectCurrentUser);

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += Number(item.price);
    });
    return total;
  };

  const isNotEmpty = () => cartItems.length > 0;

  const handleChange = (event: any, index: number) => {
    const newValues = [...selectValues];
    newValues[index] = event.target.value;
    setSelectValues(newValues);
  };

  useEffect(() => {
    const newValues: any = [...selectValues];
    cartItems?.forEach((item, index) => {
      newValues[index] = {
        productId: item.productId,
        quantity: item.quantity,
      };
      setSelectValues(newValues);
      // setSelectValues((prev) => [...prev, item.quantity]);
    });
    //eslint-disable-next-line
  }, [cartItems]);

  /*   const handleChangeQuantity = () => {
    dispatch(
      changeQuantity({
        data: {
          productId: item?.productId,
          sizeType: Number(sizeValue),
          quantity: parseInt(selectedQuantity),
        },
        token: currentUser?.jwtToken,
      })
    );
  }; */

  const handleRemoveItem = (productId: string, sizeType: SizeType) => {
    dispatch(
      removeItem({
        data: {
          productId: productId,
          sizeType: sizeType,
        },
        token: currentUser?.jwtToken,
      })
    );
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
          Your Cart
        </Typography>
        {isNotEmpty() ? (
          <Box className={styles.priceBox}>
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: "1rem" }}>
                Total
              </Typography>
              <Typography className={styles.totalPrice}>
                {getTotalPrice()} lei
              </Typography>
            </Box>
            <Button variant="contained">Către casă</Button>
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
              <Box className={styles.cartItemBox} key={item.productId + index}>
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
                      Pret: {item.price} lei
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
                      value={Number(selectValues[index]?.quantity) || ""}
                      onChange={(e) => handleChange(e, index)}
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
                    Number(item.price) * item.quantity
                  } lei`}</Typography>
                  <Close
                    className={styles.closeIcon}
                    onClick={() =>
                      handleRemoveItem(item.productId, item.sizeType)
                    }
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <>
            <Typography>Your cart is empty</Typography>
            <Link href="/baby">
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
    </Container>
  );
};

export default Cart;
