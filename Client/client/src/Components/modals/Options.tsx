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

export const Options: FC<{
  handleClose: Function;
  card: ProductItemModel;
}> = ({ handleClose, card }) => {
  const [sizeValue, setSizeValue] = useState<string>("");
  let [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("0");

  const handleChange = (event: SelectChangeEvent) => {
    setSizeValue(event.target.value as string);
  };

  useEffect(() => {
    const filteredSize = card.productSizes.filter((prod) => {
      return prod.size.toString() === sizeValue.toString();
    });

    if (filteredSize.length > 0) {
      setMaxQuantity(filteredSize[0].quantity);
    }

    //eslint-disable-next-line
  }, [sizeValue]);

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
          {card.price}.00 lei
        </Typography>
        <FormControl className={styles.selectSize}>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            id="demo-simple-select-label"
            value={sizeValue}
            onChange={handleChange}
            label="Size"
            defaultValue="1"
          >
            {card.productSizes.map((size, index) => (
              <MenuItem key={index} value={size.size}>
                {ConvertSizeToLabel(Number(size.size))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className={styles.qty}>
          <FormControl className={styles.selectQuantity}>
            <InputLabel>Quantity</InputLabel>
            <Select
              value={selectedQuantity}
              // defaultValue="1"
              label="Quantity"
              onChange={handleQuantity}
            >
              <MenuItem value="1">1</MenuItem>
              {getTotalQuantity().map((item) => (
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
