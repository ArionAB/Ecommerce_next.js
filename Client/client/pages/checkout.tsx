import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import styles from "../styles/checkout.module.scss";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { selectCartItems } from "../src/Store/Selectors/cartSelectors";
import { resourceUrl } from "../src/Utils";
import { ConvertSizeToLabel } from "../src/Utils/Functions/ConvertEnum";
import Link from "next/link";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";
import { updateUser } from "../src/Store/Thunks/userThunks";
import BillingAddress from "../src/Components/checkout-page/BillingAddress";
import { ShippingAddressModel } from "../src/Store/Models/User/ShippingAddressModel";
import { PaymentMethodType } from "../src/Store/Enums/Order/PaymentMethodType";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import { addOrder } from "../src/Store/Thunks/orderThunks";
import { OrderStatusType } from "../src/Store/Enums/Order/OrderStatusType";
import { SizeType } from "../src/Store/Enums/SizeType";
import { removeAllItems } from "../src/Store/Thunks/cartThunks";
import { useRouter } from "next/router";
import { resetCartState } from "../src/Store/Slices/cartSlice";
import ShippingAddress from "../src/Components/checkout-page/ShippingAddress";
import { setCurrentUser } from "../src/Store/Slices/authenticateSlice";
import { useFormState } from "../src/Utils/Hooks/useReactForm";
import { addAppNotification } from "../src/Store/Slices/appNotificationSlice";

export const Checkout = () => {
  const [hasErrors, setHasErrors] = useState(true);
  const [formState, setFormProp, setFormState] = useFormState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    info: "",
    zipCode: 0,
    city: "",
    county: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    PaymentMethodType.Card
  );
  const [billing, setBilling] = useState<ShippingAddressModel | any>({});
  const [checkForErrors, setCheckForErrors] = useState(false);
  const [displayPayment, setDisplayPayment] = useState(false);
  const [activeBreadcrumb, setActiveBreadcrumb] = useState(2);
  const [sameAddress, setSameAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);

  const currentUser: any = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + Number(item.priceKg) * Number(item.quantity),
    0
  );

  const priceWithDelivery = () => {
    if (totalPrice < 200) {
      return totalPrice + 15;
    } else {
      return totalPrice;
    }
  };

  const handleBillingChange = (billingInfo: any) => {
    setBilling(billingInfo);
  };

  useEffect(() => {
    if (sameAddress) {
      setBilling({
        firstNameBill: formState.firstName,
        lastNameBill: formState.lastName,
        addressBill: formState.address,
        infoBill: formState.info,
        zipCodeBill: formState.zipCode,
        cityBill: formState.city,
        countyBill: formState.county,
      });
    } else {
      setBilling({
        firstNameBill: billing.firstNameBill,
        lastNameBill: billing.lastNameBill,
        addressBill: billing.addressBill,
        infoBill: billing.infoBill,
        zipCodeBill: billing.zipCodeBill,
        cityBill: billing.cityBill,
        countyBill: billing.countyBill,
      });
    }

    //eslint-disable-next-line
  }, [sameAddress, formState]);

  const handleSubmit = () => {
    if (hasErrors || checkForErrors) return;

    setActiveBreadcrumb((prev) => prev + 1);
    setDisplayPayment(true);
    if (!currentUser?.jwtToken) {
      localStorage.setItem("shipping", JSON.stringify(formState));
      localStorage.setItem("billing", JSON.stringify(formState));
      if (!sameAddress) {
        localStorage.setItem("billing", JSON.stringify(billing));
      }
      return;
    } else if (sameAddress) {
      dispatch(
        updateUser({
          data: {
            ...formState,
            firstNameBill: formState.firstName,
            lastNameBill: formState.lastName,
            addressBill: formState.address,
            infoBill: formState.info,
            zipCodeBill: formState.zipCode as number,
            cityBill: formState.city,
            countyBill: formState.county,
          },
          sameAddress: sameAddress,
          token: currentUser?.jwtToken,
        })
      ).then(() => {
        dispatch(
          setCurrentUser({
            ...currentUser,
            firstNameBill: formState.firstName,
            lastNameBill: formState.lastName,
            addressBill: formState.address,
            infoBill: formState.info,
            zipCodeBill: formState.zipCode,
            cityBill: formState.city,
            countyBill: formState.county,
            firstName: formState.firstName,
            lastName: formState.lastName,
            address: formState.address,
            info: formState.info,
            zipCode: formState.zipCode,
            city: formState.city,
            county: formState.county,
            phone: formState.phone,
          })
        );
        setDisplayPayment(true);
      });
    } else {
      dispatch(
        updateUser({
          data: {
            ...formState,
            firstNameBill: billing.firstNameBill,
            lastNameBill: billing.lastNameBill,
            addressBill: billing.addressBill,
            infoBill: billing.infoBill,
            zipCodeBill: billing.zipCodeBill,
            cityBill: billing.cityBill,
            countyBill: billing.countyBill,
          },
          sameAddress: sameAddress,
          token: currentUser?.jwtToken,
        })
      ).then(() => {
        dispatch(
          setCurrentUser({
            ...currentUser,
            firstNameBill: billing.firstNameBill,
            lastNameBill: billing.lastNameBill,
            addressBill: billing.addressBill,
            infoBill: billing.infoBill,
            zipCodeBill: billing.zipCodeBill,
            cityBill: billing.cityBill,
            countyBill: billing.countyBill,

            firstName: formState.firstName,
            lastName: formState.lastName,
            address: formState.address,
            info: formState.info,
            zipCode: formState.zipCode,
            city: formState.city,
            county: formState.county,
            phone: formState.phone,
          })
        );
        setDisplayPayment(true);
      });
    }
  };

  useEffect(() => {
    if (!hasErrors && !checkForErrors) {
      handleSubmit();
    }

    //eslint-disable-next-line
  }, [checkForErrors]);

  const placeOrder = () => {
    setLoadingOrder(true);
    dispatch(
      addOrder({
        data: {
          status: OrderStatusType.Pending,
          paymentMethod: paymentMethod,
          userId: currentUser?.userId,
          address: { ...formState, ...billing },
          orderProducts: [
            ...cartItems.map((item) => {
              return {
                productId: item.productId,
                title: item.title,
                price:
                  item.sizeType === SizeType.Big
                    ? Number(item.priceKg)
                    : Number(item.priceHalf),
                sizeType: item.sizeType,
                fruitType: Number(item.fruitType),
                quantity: Number(item.quantity),
                productCategory: item.productCategory,
                filePath: item.productPictures[0].filePath,
                mixedFruitId: item.mixedFruitId ?? "",
              };
            }),
          ],
        },
      })
    )
      .then((res) => {
        setLoadingOrder(false);
        if (res.meta.requestStatus === "fulfilled" && currentUser) {
          dispatch(
            removeAllItems({
              token: currentUser?.jwtToken,
            })
          ).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              dispatch(
                addAppNotification({
                  message: "Comanda a fost plasată!",
                  severity: "success",
                })
              );
              dispatch(resetCartState());
              router.push("/orders");
            }
          });
        } else if (res.meta.requestStatus === "fulfilled" && !currentUser) {
          dispatch(
            addAppNotification({
              message: "Comanda a fost plasată!",
              severity: "success",
            })
          );
          dispatch(resetCartState());
          router.push("/");
        }
      })
      .catch((error) =>
        dispatch(
          addAppNotification({ message: error.message, severity: "error" })
        )
      );
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
        handleSubmit();
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
        {!displayPayment && activeBreadcrumb === 2 ? (
          <ShippingAddress
            setHasErrors={setHasErrors}
            setFormProp={setFormProp}
            formState={formState}
            setFormState={setFormState}
            checkForErrors={checkForErrors}
            setCheckForErrors={setCheckForErrors}
          />
        ) : (
          <Box className={styles.information}>
            <Box className={styles.contact}>
              <Typography className={styles.label}>Contact</Typography>

              {currentUser ? (
                <Box className={styles.withEdit}>
                  <Typography>{currentUser?.email}</Typography>
                  <Button
                    onClick={() => {
                      setDisplayPayment(false);
                      setActiveBreadcrumb(2);
                    }}
                  >
                    Editează
                  </Button>{" "}
                </Box>
              ) : (
                <Box className={styles.withEdit}>
                  <Typography>{formState.email}</Typography>{" "}
                  <Button
                    onClick={() => {
                      setDisplayPayment(false);
                      setActiveBreadcrumb(2);
                    }}
                  >
                    Editează
                  </Button>{" "}
                </Box>
              )}
            </Box>
            <Box className={styles.contact}>
              <Typography className={styles.label}>Adresa</Typography>
              {currentUser ? (
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
              ) : (
                <Box className={styles.withEdit}>
                  <Typography>
                    {formState.address}, {formState.city}, {formState.county}
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
              )}
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
          <BillingAddress
            setBilling={handleBillingChange}
            sameAddress={sameAddress}
            isSubmitting={isSubmitting}
            setHasErrors={setHasErrors}
            deliveryAddress={formState}
          />
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
                  setIsSubmitting(false);
                  setActiveBreadcrumb(2);
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
                onClick={() => placeOrder()}
                disabled={loadingOrder}
                startIcon={
                  loadingOrder ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    ""
                  )
                }
              >
                Plasează comanda
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.continueBTN}
                onClick={() => {
                  setCheckForErrors(true);
                }}
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
