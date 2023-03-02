import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import styles from "../styles/checkout.module.scss";
import { useAppDispatch, useAppSelector } from "../src/Store";
import {
  selectCartItems,
  selectTotalPrice,
} from "../src/Store/Selectors/cartSelectors";
import { resourceUrl } from "../src/Utils";
import { ConvertSizeToLabel } from "../src/Utils/Functions/ConvertEnum";
import Link from "next/link";
import BreadLink from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";
import { updateUser } from "../src/Store/Thunks/userThunks";
import BillingAddress from "../src/Components/checkout-page/BillingAddress";
import { ShippingAddressModel } from "../src/Store/Models/User/ShippingAddressModel";
import { PaymentMethodType } from "../src/Store/Enums/Order/PaymentMethodType";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { style } from "@mui/system";

export const Checkout = () => {
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    info: "",
    zipCode: "",
    city: "",
    county: "",
    phone: "",
  });
  const [billing, setBilling] = useState<ShippingAddressModel | any>({});
  const [displayPayment, setDisplayPayment] = useState(false);
  const [activeBreadcrumb, setActiveBreadcrumb] = useState(2);
  const [sameAddress, setSameAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    PaymentMethodType.Card
  );

  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setShipping({
      firstName: currentUser?.firstName ?? "",
      lastName: currentUser?.lastName ?? "",
      address: currentUser?.address ?? "",
      info: currentUser?.info ?? "",
      zipCode: currentUser?.zipCode ?? "",
      city: currentUser?.city ?? "",
      county: currentUser?.county ?? "",
      phone: currentUser?.phone ?? "",
    });
  }, [currentUser]);

  const priceWithDelivery = () => {
    if (totalPrice < 200) {
      return totalPrice + 15;
    } else {
      return totalPrice;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (billingInfo: any) => {
    setBilling(billingInfo);
  };

  const handleSubmit = () => {
    setActiveBreadcrumb((prev) => prev + 1);
    if (sameAddress) {
      dispatch(
        updateUser({
          data: {
            ...shipping,
            firstNameBill: shipping.firstName,
            lastNameBill: shipping.lastName,
            addressBill: shipping.address,
            infoBill: shipping.info,
            zipCodeBill: shipping.zipCode,
            cityBill: shipping.city,
            countyBill: shipping.county,
            phoneBill: shipping.phone,
          },
          sameAddress: sameAddress,
          token: currentUser?.jwtToken,
        })
      ).then(() => setDisplayPayment(true));
    } else {
      dispatch(
        updateUser({
          data: {
            ...shipping,
            firstNameBill: billing.firstNameBill,
            lastNameBill: billing.lastNameBill,
            addressBill: billing.addressBill,
            infoBill: billing.infoBill,
            zipCodeBill: billing.zipCodeBill,
            cityBill: billing.cityBill,
            countyBill: billing.countyBill,
            phoneBill: billing.phoneBill,
          },
          sameAddress: sameAddress,
          token: currentUser?.jwtToken,
        })
      ).then(() => setDisplayPayment(true));
    }
  };

  const breadcrumbs = [
    <Link key="1" color="inherit" href="/cart" className={styles.breadCart}>
      <Typography fontSize={14}>Coș</Typography>
    </Link>,
    <Typography
      fontSize={14}
      key="2"
      sx={
        activeBreadcrumb === 2
          ? { color: "#333" }
          : { color: "#b06f2a", cursor: "pointer" }
      }
      onClick={() => {
        setDisplayPayment(false);
        setActiveBreadcrumb(2);
      }}
    >
      Detalii livrare
    </Typography>,
    <Typography
      fontSize={14}
      key="3"
      onClick={() => {
        setDisplayPayment(true);
        setActiveBreadcrumb(3);
      }}
      sx={
        activeBreadcrumb === 3
          ? { color: "#333" }
          : { color: "#b06f2a", cursor: "pointer" }
      }
    >
      Plată
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
        {!displayPayment ? (
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
                  name="lastName"
                  value={shipping.lastName}
                  onChange={(e) => handleChange(e)}
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
                  name="firstName"
                  value={shipping.firstName}
                  onChange={(e) => handleChange(e)}
                >
                  {shipping.firstName}
                </TextField>
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
                name="address"
                value={shipping.address}
                className={styles.textfield}
                onChange={(e) => handleChange(e)}
              >
                =
              </TextField>
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
                name="info"
                value={shipping.info}
                className={styles.textfield}
                onChange={(e) => handleChange(e)}
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
                  name="zipCode"
                  value={shipping.zipCode}
                  className={styles.textfield}
                  onChange={(e) => handleChange(e)}
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
                  name="city"
                  value={shipping.city}
                  className={styles.textfield}
                  onChange={(e) => handleChange(e)}
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
                name="county"
                value={shipping.county}
                className={styles.textfield}
                onChange={(e) => handleChange(e)}
              >
                {shipping.county}
              </TextField>
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
                name="phone"
                value={shipping.phone}
                className={styles.textfield}
                onChange={(e) => handleChange(e)}
              >
                {shipping.phone}
              </TextField>
            </Grid>
          </form>
        ) : (
          <Box className={styles.information}>
            <Box className={styles.contact}>
              <Typography className={styles.label}>Contact</Typography>
              <Box className={styles.withEdit}>
                <Typography>{currentUser?.email}</Typography>{" "}
                <Button
                  onClick={() => {
                    setDisplayPayment(false);
                    setActiveBreadcrumb(2);
                  }}
                >
                  Editează
                </Button>
              </Box>
            </Box>
            <Box className={styles.contact}>
              <Typography className={styles.label}>Adresa</Typography>
              <Box className={styles.withEdit}>
                <Typography>
                  {currentUser?.address}, {currentUser?.city},{" "}
                  {currentUser?.county}
                </Typography>{" "}
                <Button
                  onClick={() => {
                    setDisplayPayment(false);
                    setActiveBreadcrumb(2);
                  }}
                >
                  Editează
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {activeBreadcrumb === 2 && (
          <Box className={styles.billing}>
            <Checkbox
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
              sx={{
                color: "#b06f2a",
                "&.Mui-checked": {
                  color: "#b06f2a",
                },
              }}
            />
            <Typography>Adresa de facturare este aceeași</Typography>
          </Box>
        )}

        {!sameAddress && activeBreadcrumb === 2 && (
          <BillingAddress setBilling={handleBillingChange} />
        )}

        {activeBreadcrumb === 3 && (
          <Box className={styles.payment}>
            <Typography className={styles.label}>Metoda de plată</Typography>
            <Typography className={styles.secured}>
              Toate tranzacțiile sunt securizate și encriptate.
            </Typography>
            <FormGroup className={styles.choose_method}>
              <Box className={styles.each_method}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={paymentMethod}
                      checked={paymentMethod === PaymentMethodType.Card}
                      sx={{
                        color: "#b06f2a",
                        "&.Mui-checked": {
                          color: "#b06f2a",
                        },
                      }}
                      onChange={() => setPaymentMethod(PaymentMethodType.Card)}
                    />
                  }
                  label="Credit card"
                />
                <Box className={styles.images}>
                  <img src="visa.svg" alt="visa" />
                  <img src="mastercard.svg" alt="mastercard" />
                </Box>
              </Box>
              <Box className={styles.each_method}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={paymentMethod}
                      checked={paymentMethod === PaymentMethodType.Transfer}
                      sx={{
                        color: "#b06f2a",
                        "&.Mui-checked": {
                          color: "#b06f2a",
                        },
                      }}
                      onChange={() =>
                        setPaymentMethod(PaymentMethodType.Transfer)
                      }
                    />
                  }
                  label="Transfer bancar"
                />
              </Box>
              <Box className={styles.each_method}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={paymentMethod}
                      checked={paymentMethod === PaymentMethodType.Cash}
                      sx={{
                        color: "#b06f2a",
                        "&.Mui-checked": {
                          color: "#b06f2a",
                        },
                      }}
                      onChange={() => setPaymentMethod(PaymentMethodType.Cash)}
                    />
                  }
                  label="Plată la livrare"
                />
                <CurrencyExchangeIcon className={styles.svg} />
              </Box>
            </FormGroup>
          </Box>
        )}

        <Box className={styles.bottomForm}>
          {activeBreadcrumb === 1 ? (
            <Link href="/cart" className={styles.editCart}>
              <NavigateBeforeIcon />
              <Typography> Editează coșul</Typography>
            </Link>
          ) : activeBreadcrumb === 2 ? (
            <Link href="/cart" className={styles.editCart}>
              <NavigateBeforeIcon />
              <Typography> Editează coșul</Typography>
            </Link>
          ) : (
            <Box className={styles.editCart}>
              <NavigateBeforeIcon />
              <Typography
                onClick={() => {
                  setDisplayPayment(false);
                  setActiveBreadcrumb(1);
                }}
              >
                Editează adresa
              </Typography>
            </Box>
          )}

          {activeBreadcrumb === 3 ? (
            <>
              <Button
                className={styles.continueBTN}
                onClick={() => handleSubmit()}
              >
                Plasează comanda
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.continueBTN}
                onClick={() => handleSubmit()}
              >
                Continuă
              </Button>
            </>
          )}
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
                Number(item.priceKg) * Number(item.quantity)
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
