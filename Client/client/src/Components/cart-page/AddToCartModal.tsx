import React, { FC } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Store";
import {
  selectCartItems,
  selectTotalPrice,
} from "../../Store/Selectors/cartSelectors";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../../styles/addToCartModal.module.scss";
import { resourceUrl } from "../../Utils";
import {
  ConvertFruitTypeToLabel,
  ConvertProductCategoryType,
  ConvertSizeToLabel,
} from "../../Utils/Functions/ConvertEnum";
import { SizeType } from "../../Store/Enums/SizeType";
import { getCartItems, removeItem } from "../../Store/Thunks/cartThunks";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";

export const AddToCartModal: FC<{ open: boolean; onClose: Function }> = ({
  open,
  onClose,
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (cartProductId: string, sizeType: SizeType) => {
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
  };

  return (
    <Box className={styles.modal}>
      <Box className={styles.arrowCart}>
        <EastIcon onClick={() => onClose()} />

        <Link href="/cart">Coșul tău</Link>
      </Box>
      <Box className={styles.cartItems}>
        {cartItems.map((item) => {
          return (
            <Box className={styles.cartItem} key={item.cartProductId}>
              <img
                src={resourceUrl + item.productPictures[0].filePath}
                alt={item.title}
                className={styles.cartItemImage}
              />
              <Box className={styles.productDetails}>
                <Typography className={styles.title}>
                  {ConvertProductCategoryType(
                    item.productCategory
                  )?.toUpperCase()}
                </Typography>
                <Typography>
                  {ConvertFruitTypeToLabel(Number(item.fruitType))}
                </Typography>
                <Typography className={styles.qty}>
                  {ConvertSizeToLabel(item.sizeType)}
                </Typography>
                <Typography className={styles.qty}>
                  Qty: {item.quantity}
                </Typography>
              </Box>
              <Box className={styles.closeBox}>
                <CloseIcon
                  className={styles.removeItem}
                  onClick={() =>
                    handleRemoveItem(item.cartProductId, item.sizeType)
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
            {totalPrice} lei
          </Typography>
        </Box>
        <Button className={styles.buyNow} variant="contained">
          Către casă
        </Button>
        <Link href="/cart">
          <Button className={styles.addCart} variant="contained">
            Afișare coș cumpărături
          </Button>
        </Link>
        <Box></Box>
      </Box>
    </Box>
  );
};
