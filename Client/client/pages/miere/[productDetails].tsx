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
  TextField,
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

import { Recommended } from "../../src/Components/product-details-page/Recommended";
import { RecentlyViewed } from "../../src/Components/home-page/RecentlyViewed";
import { Add, Remove } from "@mui/icons-material";

const ProductDetails: FC<{
  handleClose: Function;
  open: boolean;
  card: ProductItemModel;
}> = ({ handleClose, open, card }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [sizeValue, setSizeValue] = useState<string>(SizeType.Big.toString());
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");

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
    } else {
      addToCart();
      setOpenCart(true);
    }
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
          <Typography>Alege mărimea borcanului</Typography>

          <Box className={styles.selectSize}>
            <Button
              onClick={() => setSizeValue(SizeType.Small.toString())}
              className={styles.sizeBTN}
              data-active={Number(sizeValue) === SizeType.Small}
            >
              500 g
            </Button>
            <Button
              onClick={() => setSizeValue(SizeType.Big.toString())}
              className={styles.sizeBTN}
              data-active={Number(sizeValue) === SizeType.Big}
            >
              1000 g
            </Button>
          </Box>
          <Typography className={styles.qtyTitle}>Cantitate</Typography>
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
