import React, { FC, forwardRef, ReactElement, Ref } from "react";
import { Box, Button, Typography, Slide, Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Store";
import { selectCartItems } from "../../Store/Selectors/cartSelectors";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../../styles/addToCartModal.module.scss";
import { resourceUrl } from "../../Utils";
import Image from "next/image";
import {
  ConvertFruitTypeToLabel,
  ConvertHoneyType,
  ConvertSizeToLabel,
} from "../../Utils/Functions/ConvertEnum";
import { SizeType } from "../../Store/Enums/SizeType";
import { getCartItems, removeItem } from "../../Store/Thunks/cartThunks";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { TransitionProps } from "@mui/material/transitions";
import { setCartItems } from "../../Store/Slices/cartSlice";
import { FruitItems } from "../selectItems/FruitItems";
import { FruitType } from "../../Store/Enums/Product/FruitType";
import { TotalPrice } from "../../Utils/Functions/TotalPrice";

const Transition: any = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const AddToCartModal: FC<{
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}> = ({ open, onClose }) => {
  const cartItems = useAppSelector(selectCartItems);

  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (
    cartProductId: string,
    sizeType: SizeType,
    mixedFruitId: FruitType[],
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
          : item.sizeType !== sizeType
          ? true
          : JSON.stringify(item.mixedFruitId) !== JSON.stringify(mixedFruitId)
          ? true
          : false
      );

      localStorage.setItem("cart", JSON.stringify(newCartItems));
      dispatch(setCartItems(newCartItems));
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
    <Dialog
      TransitionComponent={Transition}
      open={open}
      className={styles.dialogDetails}
      onClose={onClose}
    >
      <Box className={styles.modal}>
        <Box className={styles.arrowCart}>
          <EastIcon onClick={(e) => onClose(e, "backdropClick")} />

          <Link href="/cart">Coșul tău</Link>
        </Box>
        <Box className={styles.cartItems}>
          {cartItems?.map((item) => {
            return (
              <Box
                className={styles.cartItem}
                key={
                  item.productId +
                  item.sizeType +
                  item.fruitType +
                  item.mixedFruitId
                }
              >
                <Box className={styles.productDetails}>
                    <Image src="/poliflora.jpg" alt={item.title}/>
               {/*    <img
                    src={resourceUrl + item.productPictures[0]?.filePath}
                    alt={item.title}
                    className={styles.cartItemImage}
                  /> */}
                  <Box className={styles.info}>
                    <Typography className={styles.title}>
                      {ConvertHoneyType(item.productCategory)?.toUpperCase()}
                    </Typography>
                    <Typography>
                      {ConvertFruitTypeToLabel(Number(item.fruitType))}
                    </Typography>
                    <Typography className={styles.fruits}>
                      {handleConvertFruitTypeToLabel(item.mixedFruitId)}
                    </Typography>
                    <Typography className={styles.qty}>
                      {ConvertSizeToLabel(item.sizeType)}
                    </Typography>
                    <Typography className={styles.qty}>
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Box className={styles.closeBox}>
                  <CloseIcon
                    className={styles.removeItem}
                    onClick={() =>
                      handleRemoveItem(
                        item.cartProductId,
                        item.sizeType,
                        item.mixedFruitId,
                        item.productId
                      )
                    }
                  />
                  <Typography className={styles.price}>
                    {item.priceKg} lei
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box className={styles.bottom}>
          <Box className={styles.totalSum}>
            <Typography>
              Suma totală <span className={styles.tva}>TVA incl.</span>
            </Typography>
            <Typography className={styles.totalPrice}>
              {TotalPrice(cartItems)} lei
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
          <Box></Box>
        </Box>
      </Box>
    </Dialog>
  );
};
