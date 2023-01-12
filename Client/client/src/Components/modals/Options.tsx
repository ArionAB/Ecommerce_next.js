import {
  Dialog,
  Typography,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { FC, useState, useEffect } from "react";
import styles from "../../../styles/options.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { ConvertSizeToLabel } from "../../Utils/Functions/ConvertEnumToNumber";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { SizeItems } from "../selectItems/SizeItems";

export const Options: FC<{
  handleClose: Function;
  card: ProductItemModel;
}> = ({ handleClose, card }) => {
  const [sizeValue, setSizeValue] = useState<number>(2);
  let [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setSizeValue(Number(event.target.value));
  };

  const getTotalQuantity = () => {
    let quantitiesArray: any[] = [];

    if (maxQuantity > 10) {
      maxQuantity = 10;
    }
    //we dont want to show more than 10 quantities
    for (let i = 2; i <= maxQuantity; i++) {
      quantitiesArray.push(i);
    }
    return quantitiesArray;
  };

  const handleQuantity = (event: SelectChangeEvent) => {
    setSelectedQuantity(event.target.value as string);
  };

  const handleSize = (event: SelectChangeEvent) => {
    setSizeValue(Number(event.target.value));
  };

  return (
    // <Dialog open={open}>
    <>
      <Button onClick={() => handleClose()} className={styles.closeBTN}>
        <CloseIcon />
      </Button>
      <Box className={styles.options}>
        <Typography variant="h4" className={styles.title}>
          {card.title}
        </Typography>

        <Typography variant="h6" className={styles.price}>
          {card.price} lei
        </Typography>
        <Box>
          <FormControl className={styles.selectWeight}>
            <InputLabel>Mărime</InputLabel>
            <Select
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
          <Button className={styles.addCart}>Add to cart</Button>
        </Box>
      </Box>
      {/* </Dialog> */}
    </>
  );
};
