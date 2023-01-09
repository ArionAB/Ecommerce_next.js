import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import { getProduct } from "../../src/Store/Thunks/productThunks";
import { useAppDispatch, useAppSelector } from "../../src/Store";
import { selectProductItem } from "../../src/Store/Selectors/productSelectors";
import { guidRegex } from "../../src/Utils/Functions/guidRegex";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { resourceUrl } from "../../src/Utils";
import styles from "../../styles/productDetails.module.scss";
import { ConvertSizeToLabel } from "../../src/Utils/Functions/ConvertEnumToNumber";
import { SelectChangeEvent } from "@mui/material/Select";
import { Options } from "../../src/Components/modals/Options";
import Button from "@mui/material/Button/Button";
import { WeightItems } from "../../src/Components/selectItems/WeightItems";
import Close from "@mui/icons-material/Close";

const ProductDetails: FC<{ handleClose: Function; open: boolean }> = ({
  handleClose,
  open,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [sizeValue, setSizeValue] = useState<string>("2");
  let [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { productDetails } = router.query;
  const item = useAppSelector(selectProductItem);

  const imageLoader = () => {
    return `${resourceUrl}${item?.productPictures[imageIndex]?.filePath}`;
  };

  useEffect(() => {
    if (guidRegex(productDetails as string))
      dispatch(getProduct(productDetails as string));
  }, [productDetails]);

  const handleChange = (event: SelectChangeEvent) => {
    setSizeValue(event.target.value as string);
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

  return (
    <>
      <Button onClick={() => handleClose()} className={styles.closeModal}>
        <Close />
      </Button>
      <Container maxWidth="xl" className={styles.container}>
        <Box className={styles.images}>
          <Image
            src={resourceUrl + item?.productPictures[imageIndex]?.filePath}
            alt={item?.title}
            width={700}
            height={700}
            loader={imageLoader}
          />
          <Box>
            {item?.productPictures.map((picture, index) => (
              <img
                key={index}
                src={resourceUrl + picture.filePath}
                alt={item?.title}
                width={100}
                height={100}
                onClick={() => setImageIndex(index)}
                className={styles.thumbImage}
              />
            ))}
          </Box>
        </Box>
        <Box className={styles.details}>
          <Typography variant="h4" className={styles.title}>
            {item?.title}
          </Typography>
          <Typography className={styles.price}>{item?.price}.00 lei</Typography>

          <FormControl className={styles.selectSize}>
            <InputLabel id="demo-simple-select-label">Mărime</InputLabel>
            <Select
              id="demo-simple-select-label"
              value={sizeValue}
              onChange={handleChange}
              label="Marime"
              defaultValue="1"
            >
              {WeightItems.map((size, index) => (
                <MenuItem key={index} value={size.value}>
                  {size.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className={styles.qty}>
            <FormControl className={styles.selectQuantity}>
              <InputLabel>Cantitate</InputLabel>
              <Select
                value={selectedQuantity}
                label="Cantitate"
                onChange={handleQuantity}
              >
                <MenuItem value="1">1</MenuItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button className={styles.addCart}>Add to cart</Button>
          </Box>

          <Typography
            sx={{ whiteSpace: "pre-line" }}
            className={styles.description}
          >
            {item.description.split("<br/>").join("\n")}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default ProductDetails;
