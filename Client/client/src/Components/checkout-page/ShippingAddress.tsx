import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import styles from "../../../styles/checkout.module.scss";
import { Typography, Grid, TextField } from "@mui/material";
import { ShippingAddressModel } from "../../Store/Models/User/ShippingAddressModel";

const ShippingAddress: FC<{
  setShipping: Function;
  shipping: any;
}> = ({ setShipping, shipping }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      setShipping({
        firstName: currentUser?.firstName ?? "",
        lastName: currentUser?.lastName ?? "",
        email: currentUser?.email ?? "",
        address: currentUser?.address ?? "",
        info: currentUser?.info ?? "",
        zipCode: currentUser?.zipCode ?? "",
        city: currentUser?.city ?? "",
        county: currentUser?.county ?? "",
        phone: currentUser?.phone ?? "",
      });
    } else {
      const shippingAddress = localStorage.getItem("shipping")
        ? JSON.parse(localStorage.getItem("shipping")!)
        : null;
      if (shippingAddress) {
        setShipping({
          firstName: shippingAddress?.firstName ?? "",
          lastName: shippingAddress?.lastName ?? "",
          email: shippingAddress?.email ?? "",
          address: shippingAddress?.address ?? "",
          info: shippingAddress?.info ?? "",
          zipCode: shippingAddress?.zipCode ?? "",
          city: shippingAddress?.city ?? "",
          county: shippingAddress?.county ?? "",
          phone: shippingAddress?.phone ?? "",
        });
      }
    }

    //eslint-disable-next-line
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  return (
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
        <Grid item xs={12} md={12}>
          <TextField
            label="Email"
            className={styles.textfield}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
              inputMode: "numeric",
            }}
            name="email"
            value={shipping.email}
            onChange={(e) => handleChange(e)}
          >
            {shipping.email}
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
  );
};

export default ShippingAddress;
