'use client'

import { Typography, TextField, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { FC, useState } from "react";
import styles from "../../../styles/options.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { AddToCartModal } from "../cart-page/AddToCartModal";

import useAddItemToCart from "../../Utils/Hooks/useAddItemToCart";
import { SizeType } from "../../Store/Enums/SizeType";
import { Add, Remove } from "@mui/icons-material";
import { FruitType } from "../../Store/Enums/Product/FruitType";
import { FruitItems } from "../selectItems/FruitItems";

export const Options: FC<{
  handleClose: Function;
  card: ProductItemModel;
}> = ({ handleClose, card }) => {
  const [sizeValue, setSizeValue] = useState<number>(2);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [mixedFruitId, setMixedFruitId] = useState<FruitType[]>([]);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { addToCart }: any = useAddItemToCart({
    item: card,
    size: Number(sizeValue),
    qty: Number(selectedQuantity),
    mixedFruitId: mixedFruitId,
    setOpenCart,
  });

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleQuantity = (type: "add" | "remove") => {
    if (type === "add") {
      setSelectedQuantity((prev) => prev + 1);
      setError("");
    } else {
      if (selectedQuantity > 1) {
        setSelectedQuantity((prev) => prev - 1);
        setError("");
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedQuantity === 0) {
      setError("Selectează cantitatea");
      return;
    }
    if (mixedFruitId.length < 1 && Number(card.fruitType) === FruitType.mixed) {
      setError("Selectează cel puțin un tip de fructe");
    } else {
      addToCart();
      setOpenCart(true);
    }
  };

  const handlePickFruits = (id: number) => {
    if (mixedFruitId.length === 3 && !mixedFruitId.includes(id)) return;
    if (mixedFruitId.includes(id)) {
      setMixedFruitId((prev) => prev.filter((fruit) => fruit !== id));
    } else setMixedFruitId((prev) => [...prev, id].sort());
  };

  return (
    // <Dialog open={open}>
    <>
      <AddToCartModal open={openCart} onClose={handleCloseCart} />
      <Box className={styles.options}>
        <Box className={styles.title_close}>
          <Typography variant="h4" className={styles.title}>
            {card.title}
          </Typography>
          <Button onClick={() => handleClose()} className={styles.closeBTN}>
            <CloseIcon />
          </Button>
        </Box>
        <Box className={styles.wrapper}>
          <Typography className={styles.price}>
            {Number(sizeValue) === SizeType.Big
              ? card?.priceKg
              : card?.priceHalf}
            lei
          </Typography>
          {Number(card.fruitType) !== FruitType.nothing && (
            <Typography className={styles.info}>
              Procent fruct 20%, procent miere 80%.
            </Typography>
          )}

          <Typography variant="overline">Alege mărimea borcanului</Typography>

          <Box className={styles.selectSize}>
            <Button
              className={styles.sizeBTN}
              data-active={Number(sizeValue) === SizeType.Small}
              onClick={() => setSizeValue(SizeType.Small)}
            >
              500 g
            </Button>
            <Button
              onClick={() => setSizeValue(SizeType.Big)}
              className={styles.sizeBTN}
              data-active={Number(sizeValue) === SizeType.Big}
            >
              1000 g
            </Button>
          </Box>
          {Number(card?.fruitType) === FruitType.mixed && (
            <Box className={styles.selectFruits}>
              <Typography variant="overline">Alege maxim 3 fructe</Typography>

              <Paper elevation={2}>
                {FruitItems.map((fruit) => {
                  if (
                    fruit.value === FruitType.mixed ||
                    fruit.value === FruitType.nothing
                  ) {
                    return null;
                  } else {
                    return (
                      <MenuItem
                        onClick={() =>
                          handlePickFruits(fruit.value as FruitType)
                        }
                        key={fruit.value}
                        value={fruit.value}
                        divider
                        data-active={mixedFruitId.includes(fruit.value)}
                      >
                        {fruit.label}
                      </MenuItem>
                    );
                  }
                })}
              </Paper>
            </Box>
          )}

          <Typography className={styles.caption} variant="overline">
            Cantitate
          </Typography>
          <Typography className={styles.error}>{error}</Typography>
          <Box className={styles.qty}>
            <Remove onClick={() => handleQuantity("remove")} />
            <TextField
              defaultValue={1}
              value={selectedQuantity}
              className={styles.qtyNumber}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              variant="standard"
            />
            <Add onClick={() => handleQuantity("add")} />

            <Button
              className={styles.addCart}
              onClick={handleAddToCart}
              disabled={!card.inStock}
            >
              {card.inStock ? "Adaugă în coș" : "Stoc epuizat"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* </Dialog> */}
    </>
  );
};
