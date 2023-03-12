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
import { SizeType } from "../../src/Store/Enums/SizeType";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button/Button";
import { SizeItems } from "../../src/Components/selectItems/SizeItems";
import Close from "@mui/icons-material/Close";

import { QuantitySizeItems } from "../../src/Components/selectItems/QuantitySizeItems";
import { AddToCartModal } from "../../src/Components/cart-page/AddToCartModal";

import Head from "next/head";
import useAddItemToCart from "../../src/Utils/Hooks/useAddItemToCart";
import styles from "../../styles/productDetails.module.scss";
import { ProductItemModel } from "../../src/Store/Models/Product/ProductItem";
import { setProductItem } from "../../src/Store/Slices/productSlice";
import { Recommend } from "@mui/icons-material";
import { Recommended } from "../../src/Components/product-details-page/Recommended";
import { RecentlyViewed } from "../../src/Components/home-page/RecentlyViewed";

const ProductDetails: FC<{
  handleClose: Function;
  open: boolean;
  card: ProductItemModel;
}> = ({ handleClose, open, card }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [sizeValue, setSizeValue] = useState<string>("2");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");

  const item = useAppSelector(selectProductItem);

  const [openCart, setOpenCart] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { productDetails } = router.query;
  const { addToCart }: any = useAddItemToCart({
    item,
    size: Number(sizeValue),
    qty: Number(selectedQuantity),
    setOpenCart,
  });

  const imageLoader = () => {
    return `${resourceUrl}${item?.productPictures[imageIndex]?.filePath}`;
  };

  useEffect(() => {
    if (card) {
      dispatch(setProductItem(card));
    }

    //eslnt disable-next-line
  }, [card]);

  useEffect(() => {
    if (!item.productId && guidRegex(productDetails as string)) {
      dispatch(getProduct(productDetails as string));
    } else return;

    //eslint-disable-next-line
  }, [productDetails]);

  const handleChange = (event: SelectChangeEvent) => {
    setSizeValue(event.target.value as string);
  };

  const handleQuantity = (event: SelectChangeEvent) => {
    setSelectedQuantity(event.target.value as string);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleAddToCart = () => {
    addToCart();
    setOpenCart(true);
  };

  useEffect(() => {
    recentlyViewedProducts();
    //eslint-disable-next-line
  }, []);

  const recentlyViewedProducts = () => {
    const storageItems = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    const alreadyExists = storageItems.find(
      (storageItem: ProductItemModel) =>
        storageItem.productId === item.productId
    );
    if (!alreadyExists)
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify([...storageItems, item])
      );
  };

  return (
    <>
      <Head>
        <title>{item?.title}</title>
      </Head>

      <AddToCartModal open={openCart} onClose={handleCloseCart} />

      {open && (
        <Button onClick={() => handleClose()} className={styles.closeModal}>
          <Close />
        </Button>
      )}

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
          <Typography className={styles.price}>
            {Number(sizeValue) === SizeType.Big
              ? item?.priceKg
              : item?.priceHalf}{" "}
            lei
          </Typography>

          <FormControl className={styles.selectSize}>
            <InputLabel id="demo-simple-select-label">Mărime</InputLabel>
            <Select
              id="demo-simple-select-label"
              value={sizeValue}
              onChange={handleChange}
              label="Marime"
            >
              {SizeItems.map((size, index) => (
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
                {QuantitySizeItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button className={styles.addCart} onClick={handleAddToCart}>
              Adaugă în coș
            </Button>
          </Box>

          <Typography
            sx={{ whiteSpace: "pre-line" }}
            className={styles.description}
          >
            {item.description.split("<br/>").join("\n")}
          </Typography>
        </Box>
      </Container>
      <div
        className={`${styles.divider} ${styles.div_transparent} ${styles.div_dot} `}
      >
        <span className={`${styles.div_dot_two}`}></span>
      </div>
      <Recommended honeyType={item.productCategory} />
      <div
        className={`${styles.divider} ${styles.div_transparent} ${styles.div_dot} `}
      >
        <span className={`${styles.div_dot_two}`}></span>
      </div>
      <RecentlyViewed />
    </>
  );
};
export default ProductDetails;
