import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Button,
} from "@mui/material";
import styles from "../styles/checkout.module.scss";
import { useAppSelector } from "../src/Store";
import {
  selectCartItems,
  selectTotalPrice,
} from "../src/Store/Selectors/cartSelectors";
import { resourceUrl } from "../src/Utils";
import { ConvertSizeToLabel } from "../src/Utils/Functions/ConvertEnum";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const priceWithDelivery = () => {
    if (totalPrice < 200) {
      return totalPrice + 15;
    } else {
      return totalPrice;
    }
  };
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" onClick={handleClick}>
      Coș
    </Link>,
    <Link
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Detalii livrare
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Box className={styles.container}>
      <Grid className={styles.left}>
        <Box className={styles.breadcrumbs}>
          <Stack spacing={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Box>
        <form className={styles.form}>
          <Typography>Adresă de livrare</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nume"
                InputProps={{
                  classes: {
                    root: styles.cssOutlinedInput,
                    focused: styles.cssFocused,
                    notchedOutline: styles.notchedOutline,
                  },
                  inputMode: "numeric",
                }}
                className={styles.textfield}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Prenume"
                className={styles.textfield}
                InputProps={{
                  classes: {
                    root: styles.cssOutlinedInput,
                    focused: styles.cssFocused,
                    notchedOutline: styles.notchedOutline,
                  },
                  inputMode: "numeric",
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stradă și număr"
              InputProps={{
                classes: {
                  root: styles.cssOutlinedInput,
                  focused: styles.cssFocused,
                  notchedOutline: styles.notchedOutline,
                },
                inputMode: "numeric",
              }}
              className={styles.textfield}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Informații suplimentare"
              InputProps={{
                classes: {
                  root: styles.cssOutlinedInput,
                  focused: styles.cssFocused,
                  notchedOutline: styles.notchedOutline,
                },
                inputMode: "numeric",
              }}
              className={styles.textfield}
            ></TextField>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Cod poștal"
                InputProps={{
                  classes: {
                    root: styles.cssOutlinedInput,
                    focused: styles.cssFocused,
                    notchedOutline: styles.notchedOutline,
                  },
                  inputMode: "numeric",
                }}
                className={styles.textfield}
              ></TextField>
            </Grid>

            <Grid item xs={9}>
              <TextField
                label="Localitate"
                InputProps={{
                  classes: {
                    root: styles.cssOutlinedInput,
                    focused: styles.cssFocused,
                    notchedOutline: styles.notchedOutline,
                  },
                  inputMode: "numeric",
                }}
                className={styles.textfield}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Județ"
              InputProps={{
                classes: {
                  root: styles.cssOutlinedInput,
                  focused: styles.cssFocused,
                  notchedOutline: styles.notchedOutline,
                },
                inputMode: "numeric",
              }}
              className={styles.textfield}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Telefon"
              InputProps={{
                classes: {
                  root: styles.cssOutlinedInput,
                  focused: styles.cssFocused,
                  notchedOutline: styles.notchedOutline,
                },
                inputMode: "numeric",
              }}
              className={styles.textfield}
            ></TextField>
          </Grid>
        </form>
        <Box className={styles.bottomForm}>
          <Link href="/cart" className={styles.editCart}>
            <NavigateBeforeIcon />
            <Typography> Editează coșul</Typography>
          </Link>
          <Button>Continuă</Button>
        </Box>
      </Grid>
      <Box className={styles.right}>
        {cartItems.map((item, index) => {
          return (
            <Box className={styles.item} key={item.cartProductId}>
              <Box className={styles.details}>
                <Box className={styles.imgBox}>
                  <img
                    src={resourceUrl + item.productPictures[0].filePath}
                    alt={item.title}
                    className={styles.picture}
                  />
                  <span className={styles.qty}>{item.quantity}</span>
                </Box>
                <Box className={styles.titleBox}>
                  <Typography className={styles.title}>{item.title}</Typography>
                  <Typography className={styles.size}>
                    {ConvertSizeToLabel(item.sizeType)}
                  </Typography>
                </Box>
              </Box>
              <Typography className={styles.price}>{`${
                Number(item.price) * item.quantity
              } lei`}</Typography>
            </Box>
          );
        })}
        <Box className={styles.totalBox}>
          <Typography className={styles.title}>Subtotal</Typography>
          <Typography className={styles.price}>{totalPrice} lei</Typography>
        </Box>
        <Box className={styles.shipping}>
          <Typography className={styles.title}>Cost Livrare</Typography>
          {totalPrice < 200 ? 15 : 0} lei
        </Box>
        <Box className={styles.totalPrice}>
          <Typography className={styles.title}>Total</Typography>
          <Typography className={styles.price}>
            {priceWithDelivery()} lei
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
