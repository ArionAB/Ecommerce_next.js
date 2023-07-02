'use client'

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
  TextField,
  Paper,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { SizeType } from "../../src/Store/Enums/SizeType";
import Button from "@mui/material/Button/Button";
import Close from "@mui/icons-material/Close";
import { AddToCartModal } from "../../src/Components/cart-page/AddToCartModal";
import Head from "next/head";
import useAddItemToCart from "../../src/Utils/Hooks/useAddItemToCart";
import styles from "../../styles/productDetails.module.scss";
import { ProductItemModel } from "../../src/Store/Models/Product/ProductItem";
import { setProductItem } from "../../src/Store/Slices/productSlice";
import { Recommended } from "../../src/Components/product-details-page/Recommended";
import { Add, Remove } from "@mui/icons-material";
import { FruitType } from "../../src/Store/Enums/Product/FruitType";
import { FruitItems } from "../../src/Components/selectItems/FruitItems";
import { ReusableCarousel } from "../../src/Components/home-page/ReusableCarousel";
import { CustomDivider } from "../../src/Components/divider/CustomDivider";
import { imageKitLoader } from "../../src/Utils/Functions/ImageKitLoader";
import { setImageByHoneyType } from "../../src/Utils/Functions/setImageByHoneyType";
import { HoneyType } from "../../src/Store/Enums/Product/HoneyType";

const ProductDetails: FC<{
  handleClose: Function;
  open: boolean;
  card: ProductItemModel;
}> = ({ handleClose, open, card }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [sizeValue, setSizeValue] = useState<SizeType>(SizeType.Big);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [baseImage, setBaseImage] = useState<string>("")

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [mixedFruitId, setMixedFruitId] = useState<FruitType[]>([]);
  const [localStorageitems, setLocalStorageItems] = useState<
    ProductItemModel[]
  >([]);

  const item = useAppSelector(selectProductItem);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { productDetails } = router.query;

  const { addToCart }: any = useAddItemToCart({
    item,
    size: Number(sizeValue),
    qty: Number(selectedQuantity),
    mixedFruitId: mixedFruitId,
    setOpenCart,
  });



  useEffect(() => {
    if (card) {
      setImageByHoneyType(card, setBaseImage)
      dispatch(setProductItem(card));
    } else setImageByHoneyType(item, setBaseImage)

    //eslnt disable-next-line
  }, [card]);

  useEffect(() => {
    if (!item.productId && productDetails) {
      dispatch(getProduct(productDetails as string));
    } else return;
    // if (item.productId) {
    //   dispatch(getProduct(item.productId));
    // } else return;

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
    }
    if (mixedFruitId.length < 1 && Number(item.fruitType) === FruitType.mixed) {
      setError("Selectează cel puțin un tip de fructe");
    } else {
      addToCart();
      setOpenCart(true);
    }
  };

  useEffect(() => {
    recentlyViewedProducts();
    const localStorageItems = JSON.parse(
      localStorage?.getItem("recentlyViewed") || "[]"
    );

    setLocalStorageItems(
      localStorageItems.filter((item: ProductItemModel) => item.productId)
    );
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

  const handlePickFruits = (id: number) => {
    setError("");
    if (mixedFruitId.length === 3 && !mixedFruitId.includes(id)) return;
    if (mixedFruitId.includes(id)) {
      setMixedFruitId((prev) => prev.filter((fruit) => fruit !== id));
    } else setMixedFruitId((prev) => [...prev, id].sort());
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
            src={item.productCategory === HoneyType.Poliflora
              ? "/poliflora.jpg"
              : "/salcam.jpg"}
            alt={item?.title}
            width={700}
            height={700}
            loader={imageKitLoader}
          />
          {/*   <Box>
            {item?.productPictures.map((picture, index) => (
              <img
                key={index}
                // src={resourceUrl + picture.filePath}
                src={baseImage}
                alt={item?.title}
                width={100}
                height={100}
                onClick={() => setImageIndex(index)}
                className={styles.thumbImage}
              />
            ))}
          </Box> */}
        </Box>
        <Box className={styles.details}>
          <Typography variant="h4" className={styles.title}>
            {item?.title}
          </Typography>
          <Typography className={styles.price}>
            {Number(sizeValue) === SizeType.Big
              ? item?.priceKg
              : item?.priceHalf}
            lei
          </Typography>
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

          {Number(item?.fruitType) === FruitType.mixed && (
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
              disabled={!item?.inStock}
            >
              {card?.inStock ? "Adaugă în coș" : "Stoc epuizat"}
            </Button>
          </Box>

          <Typography
            sx={{ whiteSpace: "pre-line" }}
            className={styles.description}
          >
            {item?.description.split("<br/>").join("\n")}
          </Typography>
        </Box>
      </Container>
      <CustomDivider />
      <Recommended honeyType={item?.productCategory} />
      <CustomDivider />

      <Typography className={styles.categoryTitle} variant="h5">
        Produse vizualizate recent
      </Typography>
      <ReusableCarousel items={localStorageitems} />
    </>
  );
};
export default ProductDetails;
