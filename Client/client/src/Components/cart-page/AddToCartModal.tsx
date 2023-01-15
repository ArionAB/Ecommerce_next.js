import React, { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useAppSelector } from "../../Store";
import { selectCartItems } from "../../Store/Selectors/cartSelectors";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

import styles from "../../../styles/addToCartModal.module.scss";
import { resourceUrl } from "../../Utils";

export const AddToCartModal: FC<{ open: boolean; onClose: Function }> = ({
  open,
  onClose,
}) => {
  const cartItems = useAppSelector(selectCartItems);
  console.log(cartItems);

  return (
    <Box className={styles.modal}>
      <Box className={styles.arrowCart}>
        <EastIcon />
        <Link href="/cart">Coșul tău</Link>
      </Box>
      <Box className={styles.cartItems}>
        {cartItems.map((item) => {
          return (
            <Box
              className={styles.cartItem}
              key={item.productId + item.sizeType}
            >
              <img
                src={resourceUrl + item.productPictures[0].filePath}
                alt={item.title}
                className={styles.cartItemImage}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
