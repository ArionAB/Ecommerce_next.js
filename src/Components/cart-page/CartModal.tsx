import { FC } from "react";

import styles from "../../../styles/cartModal.module.scss";
import {
  Box,
  Button,
  CardMedia,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../Store";
import { selectCartItems } from "../../Store/Selectors/cartSelectors";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";

import { ConvertSizeToLabel } from "../../Utils/Functions/ConvertEnum";
import { SizeType } from "../../Store/Enums/SizeType";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import Link from "next/link";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import {
  changeQuantity,
  getCartItems,
  removeItem,
} from "../../Store/Thunks/cartThunks";
import { setCartItems } from "../../Store/Slices/cartSlice";
import { TotalPrice } from "../../Utils/Functions/TotalPrice";

export const CartModal: FC<{ setOpenDialog: Function }> = ({
  setOpenDialog,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector(selectCartItems);

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

  return (
    <Paper className={styles.container}>
      {cartItems.length < 1 ? (
        <>
          {/* <Image
            src="/empty_cart.svg"
            alt="cos gol"
            width={75}
            height={75}
            className={styles.empty_svg}
          /> */}
          <Typography className={styles.empty_title}>
            Coșul de cumpărături este gol
          </Typography>
          <Typography className={styles.empty_text}>
            Bun venit! Daca ați avut produse în coșul de cumpărături le-am
            salvat pentru dumneavoastră.{" "}
            <span onClick={() => setOpenDialog(true)}>SIGN IN</span> ca să le
            vedeți.
          </Typography>
        </>
      ) : (
        <>
          <Box className={styles.cart}>
            {cartItems?.map((item: ProductItemModel) => (
              <Box key={item.cartProductId} className={styles.item}>
                <CardMedia
                  component="img"
                  src={
                    item.productCategory === HoneyType.Poliflora
                      ? "/poliflora.jpg"
                      : "/salcam.jpg"
                  }
                  className={styles.image}
                  alt={item.title}
                />
                <Box className={styles.details}>
                  <Typography className={styles.title}>{item.title}</Typography>
                  <Typography className={styles.size}>
                    {ConvertSizeToLabel(item.sizeType)}
                  </Typography>
                  <Box className={styles.price_delete}>
                    <Typography className={styles.price}>
                      {item.sizeType === SizeType.Big
                        ? item.priceKg
                        : item.priceHalf}
                      lei
                    </Typography>
                    <DeleteOutline
                      className={styles.delete}
                      onClick={() =>
                        handleRemoveItem(
                          item.cartProductId,
                          item.sizeType,
                          item.productId
                        )
                      }
                    />
                  </Box>
                  <Box className={styles.qty_total}>
                    <Box className={styles.qty}>
                      <Remove
                        className={styles.remove}
                        onClick={() => {
                          if (item.quantity === 1) return;
                          handleChangeCartItemsQty(
                            "remove",
                            item.productId,
                            item.sizeType,
                            item.cartProductId,
                            Number(item.quantity)
                          );
                        }}
                      />
                      <TextField
                        inputProps={{
                          min: 1,
                          style: {
                            textAlign: "center",
                            padding: "3px 0 5px",
                            fontSize: "14px",
                          },
                        }}
                        defaultValue={1}
                        value={item.quantity}
                        className={styles.qtyNumber}
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
                        className={styles.add}
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
                    <Typography className={styles.title}>
                      Total:
                      <span className={styles.price}>
                        {item.sizeType === SizeType.Big
                          ? Number(item.priceKg) * Number(item.quantity)
                          : Number(item.priceHalf) * Number(item.quantity)}
                        lei
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Typography className={styles.free_shipping}>
            {Number(TotalPrice(cartItems)) >= 200
              ? "Aveți transport gratuit!"
              : `Până la transport grauit lipsesc ${
                  200 - Number(TotalPrice(cartItems))
                } lei`}
          </Typography>
          <Box className={styles.totalSum}>
            <Typography>
              Suma totală <span className={styles.tva}>TVA incl.</span>
            </Typography>
            <Typography className={styles.totalPrice}>
              {Number(TotalPrice(cartItems))} lei
            </Typography>
          </Box>
          <Link href="/checkout">
            <Button className={styles.buyNow} variant="contained">
              Către casă
            </Button>
          </Link>
          <Link href="/cart">
            <Button className={styles.addCart} variant="contained">
              Afișare coș cumpărături
            </Button>
          </Link>
        </>
      )}
    </Paper>
  );
};
