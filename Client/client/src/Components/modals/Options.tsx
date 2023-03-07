import { Typography, Select, FormControl, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { FC, useState } from "react";
import styles from "../../../styles/options.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { SizeItems } from "../selectItems/SizeItems";
import { AddToCartModal } from "../cart-page/AddToCartModal";
import { useAppSelector } from "../../Store";
import { selectProductItem } from "../../Store/Selectors/productSelectors";
import useAddItemToCart from "../../Utils/Hooks/useAddItemToCart";

export const Options: FC<{
  handleClose: Function;
  card: ProductItemModel;
}> = ({ handleClose, card }) => {
  const [sizeValue, setSizeValue] = useState<number>(2);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");
  const [openCart, setOpenCart] = useState<boolean>(false);
  const item = useAppSelector(selectProductItem);
  const { addToCart }: any = useAddItemToCart({
    item: card,
    size: Number(sizeValue),
    qty: Number(selectedQuantity),
    setOpenCart,
  });

  const handleQuantity = (event: SelectChangeEvent) => {
    setSelectedQuantity(event.target.value as string);
  };

  const handleSize = (event: SelectChangeEvent) => {
    setSizeValue(Number(event.target.value));
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleAddItemToCart = () => {
    addToCart();
  };

  return (
    // <Dialog open={open}>
    <>
      <AddToCartModal open={openCart} onClose={handleCloseCart} />
      <Button onClick={() => handleClose()} className={styles.closeBTN}>
        <CloseIcon />
      </Button>
      <Box className={styles.options}>
        <Typography variant="h4" className={styles.title}>
          {card.title}
        </Typography>

        <Typography variant="h6" className={styles.price}>
          {card.priceKg} lei
        </Typography>
        <Box>
          <FormControl className={styles.selectWeight}>
            <InputLabel>Mărime</InputLabel>
            <Select
              className={styles.textfield}
              value={sizeValue.toString()}
              label="Mărime"
              onChange={handleSize}
            >
              {SizeItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className={styles.qty}>
          <FormControl className={styles.selectQuantity}>
            <InputLabel>Cantitate</InputLabel>
            <Select
              className={styles.textfield}
              value={selectedQuantity}
              // defaultValue="1"
              label="Cantitate"
              onChange={handleQuantity}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button className={styles.addCart} onClick={handleAddItemToCart}>
            Add to cart
          </Button>
        </Box>
      </Box>
      {/* </Dialog> */}
    </>
  );
};
