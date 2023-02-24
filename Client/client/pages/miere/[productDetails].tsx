import React, {
  useEffect,
  useState,
  FC,
  forwardRef,
  ReactElement,
  Ref,
} from "react";
import { useRouter } from "next/router";
import { getProduct } from "../../src/Store/Thunks/productThunks";
import { addItemToCart } from "../../src/Store/Thunks/cartThunks";
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
  Slide,
  Dialog,
} from "@mui/material";
import Image from "next/image";
import { resourceUrl } from "../../src/Utils";
import { SizeType } from "../../src/Store/Enums/SizeType";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button/Button";
import { SizeItems } from "../../src/Components/selectItems/SizeItems";
import Close from "@mui/icons-material/Close";
import { selectCurrentUser } from "../../src/Store/Selectors/authenticationSelectors";
import { QuantitySizeItems } from "../../src/Components/selectItems/QuantitySizeItems";
import { AddToCartModal } from "../../src/Components/cart-page/AddToCartModal";
import { TransitionProps } from "@mui/material/transitions";
import Head from "next/head";

import styles from "../../styles/productDetails.module.scss";

const Transition: any = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ProductDetails: FC<{
  handleClose: Function;
  open: boolean;
  productId: string;
}> = ({ handleClose, open, productId }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [sizeValue, setSizeValue] = useState<string>("2");

  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");
  const [openCart, setOpenCart] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { productDetails } = router.query;
  const item = useAppSelector(selectProductItem);

  const imageLoader = () => {
    return `${resourceUrl}${item?.productPictures[imageIndex]?.filePath}`;
  };

  useEffect(() => {
    if (guidRegex(productDetails as string)) {
      dispatch(getProduct(productDetails as string));
    } else {
      dispatch(getProduct(productId as string));
    }

    //eslint-disable-next-line
  }, [productDetails]);

  const handleChange = (event: SelectChangeEvent) => {
    setSizeValue(event.target.value as string);
  };

  const handleQuantity = (event: SelectChangeEvent) => {
    setSelectedQuantity(event.target.value as string);
  };

  const handleAddItemToCart = () => {
    dispatch(
      addItemToCart({
        data: {
          productId: item?.productId,
          quantity: parseInt(selectedQuantity),
          sizeType: Number(sizeValue),
        },
        token: currentUser?.jwtToken,
      })
    ).then(() => {
      setOpenCart(true);
    });
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  return (
    <>
      <Head>
        <title>{item?.title}</title>
      </Head>
      <Dialog
        TransitionComponent={Transition}
        onClose={handleCloseCart}
        className={styles.dialogDetails}
        open={openCart}
      >
        <AddToCartModal open={openCart} onClose={handleCloseCart} />
      </Dialog>
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
            {Number(sizeValue) === SizeType.Big ? item.priceKg : item.priceHalf}{" "}
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
            <Button
              className={styles.addCart}
              onClick={() => handleAddItemToCart()}
            >
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
    </>
  );
};
export default ProductDetails;
