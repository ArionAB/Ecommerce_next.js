import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import styles from "../styles/cart.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { selectCartItems } from "../src/Store/Selectors/cartSelectors";
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
import { FruitType } from "../src/Store/Enums/Product/FruitType";
import { FruitItems } from "../src/Components/selectItems/FruitItems";
import { TotalPrice } from "../src/Utils/Functions/TotalPrice";
import { Add, Remove } from "@mui/icons-material";
import { ProductItemModel } from "../src/Store/Models/Product/ProductItem";

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

  const handleChangeCartItemsQty = (
    action: "add" | "remove" | "select",
    productId: string,
    sizeType: SizeType,
    cartProductId: string,
    quantity: number,
    selectedValue?: number
  ) => {
    if (currentUser) {
      dispatch(
        changeQuantity({
          data: {
            cartProductId: cartProductId,
            quantity:
              action === "add"
                ? quantity + 1
                : action === "select"
                ? (quantity = selectedValue!)
                : quantity - 1,
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
      const newCartItems = cartItems.map((item: ProductItemModel) => {
        if (item.productId === productId && item.sizeType === sizeType) {
          return {
            ...item,
            quantity:
              action === "add"
                ? Number(item.quantity) + 1
                : action === "select"
                ? selectedValue
                : Number(item.quantity) - 1,
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

  const priceWithDelivery = () => {
    if (TotalPrice(cartItems) < 200) {
      return TotalPrice(cartItems) + 15;
    } else {
      return TotalPrice(cartItems);
    }
  };

  const handleConvertFruitTypeToLabel = (selectedFruits: FruitType[]) => {
    const labels = selectedFruits?.map((fruit) => {
      const item = FruitItems.find((item) => item.value === fruit);
      if (item) {
        return item.label;
      }
    });
    return labels?.join(", ");
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
          Coș de cumpărături
        </Typography>
        {!isNotEmpty() && (
          <Link href="/">
            <Typography className={styles.continueLink}>
              Continuă cumpărăturile
            </Typography>
          </Link>
        )}
      </Box>
      <Box className={styles.items_and_checkout}>
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
                  <Box className={styles.sections}>
                   {/*  <img
                      src={resourceUrl + item.productPictures[0]?.filePath}
                      alt={item.title}
                      className={styles.picture}
                    /> */}
                    <Box className={styles.rightSection}>
                      <Box className={styles.titlePriceSize}>
                        <Link
                          href={`/miere/${item.title.replaceAll(" ", "_")}`}
                        >
                          <Typography variant="h5" className={styles.title}>
                            {item.title}
                          </Typography>
                        </Link>

                        <Typography className={styles.price}>
                          {handleConvertFruitTypeToLabel(item.mixedFruitId)}
                        </Typography>

                        <Typography className={styles.price}>
                          Pret: {item.priceKg} lei
                        </Typography>
                        <Typography className={styles.size}>
                          Marime: {ConvertSizeToLabel(item.sizeType)}
                        </Typography>
                      </Box>
                      <Box className={styles.qty}>
                        <Box className={styles.select_qty}>
                          <Remove
                            className={styles.modify}
                            onClick={() => {
                              {
                                if (item.quantity === 1) return;
                                handleChangeCartItemsQty(
                                  "remove",
                                  item.productId,
                                  item.sizeType,
                                  item.cartProductId,
                                  Number(item.quantity)
                                );
                              }
                            }}
                          />
                          <TextField
                            defaultValue={1}
                            value={item.quantity}
                            className={styles.qtyNumber}
                            inputProps={{
                              min: 1,
                            }}
                            onChange={(e) =>
                              handleChangeCartItemsQty(
                                "select",
                                item.productId,
                                item.sizeType,
                                item.cartProductId,
                                Number(item.quantity),
                                Number(e.target.value)
                              )
                            }
                            variant="standard"
                          />
                          <Add
                            className={styles.modify}
                            onClick={() =>
                              handleChangeCartItemsQty(
                                "add",
                                item.productId,
                                item.sizeType,
                                item.cartProductId,
                                Number(item.quantity)
                              )
                            }
                          />
                        </Box>
                        <Box className={styles.total_price}>
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
                    </Box>
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
        {isNotEmpty() && (
          <Box className={styles.checkout}>
            <Box className={styles.priceBox}>
              <Typography className={styles.total_text}>
                Prețul total
              </Typography>
              <Typography className={styles.totalPrice}>
                {priceWithDelivery()} lei
              </Typography>
            </Box>
            <Typography className={styles.free_shipping}>
              {Number(TotalPrice(cartItems)) >= 200
                ? "Aveți transport gratuit!"
                : `Până la transport grauit lipsesc ${
                    200 - Number(TotalPrice(cartItems))
                  } lei`}
            </Typography>
            <Link href="/checkout">
              <Button variant="contained">Finzalizează comandă</Button>
            </Link>
          </Box>
        )}
      </Box>
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
