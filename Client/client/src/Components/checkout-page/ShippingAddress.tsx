import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import styles from "../../../styles/checkout.module.scss";
import { Typography, Grid, TextField } from "@mui/material";
import { emailRegex } from "../../Utils/Functions/emailRegex";

const ShippingAddress: FC<{
  setHasErrors: Function;
  setFormState: Function;
  setFormProp: Function;
  checkForErrors: boolean;
  setCheckForErrors: Function;
  formState: any;
}> = ({
  setHasErrors,
  setFormProp,
  formState,
  setFormState,
  checkForErrors,
  setCheckForErrors,
}) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [errors, setErrors] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    county: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormState({
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
        setFormState({
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

  useEffect(() => {
    if (!checkForErrors) return;

    let isError = false;
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      county: "",
      city: "",
      phone: "",
    };

    if (formState.firstName === "") {
      errors.firstName = "Numele este obligatoriu";
      isError = true;
    }
    if (formState.lastName === "") {
      errors.lastName = "Prenumele este obligatoriu";
      isError = true;
    }
    if (!emailRegex(formState.email)) {
      errors.email = "Email-ul este invalid";
      isError = true;
    }
    if (formState.address === "") {
      errors.address = "Adresa este obligatorie";
      isError = true;
    }
    if (formState.city === "") {
      errors.city = "Localitatea este obligatorie";
      isError = true;
    }
    if (formState.county === "") {
      errors.county = "Județul este obligatoriu";
      isError = true;
    }
    if (formState.phone === "") {
      errors.phone = "Numărul de telefon este obligatoriu";
      isError = true;
    }
    if (formState.phone.length < 10) {
      errors.phone = "Numărul de telefon este invalid";

      isError = true;
    }

    setErrors(errors);

    setHasErrors(isError);

    setCheckForErrors(false);

    //eslint-disable-next-line
  }, [setHasErrors, checkForErrors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormProp(name)(value);
    setErrors({ ...errors, [e.target.name]: "" });
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
            value={formState.lastName}
            onChange={(e) => handleChange(e)}
            className={styles.textfield}
            error={errors.lastName ? true : false}
            helperText={errors.lastName && errors.lastName}
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
            value={formState.firstName}
            onChange={(e) => handleChange(e)}
            error={errors.firstName ? true : false}
            helperText={errors.firstName && errors.firstName}
          >
            {formState.firstName}
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
            value={formState.email}
            onChange={(e) => handleChange(e)}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email}
          >
            {formState.email}
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
          value={formState.address}
          className={styles.textfield}
          onChange={(e) => handleChange(e)}
          error={errors.address ? true : false}
          helperText={errors.address && errors.address}
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
          name="info"
          value={formState.info}
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
            value={formState.zipCode}
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
            value={formState.city}
            className={styles.textfield}
            onChange={(e) => handleChange(e)}
            error={errors.city ? true : false}
            helperText={errors.city && errors.city}
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
          value={formState.county}
          className={styles.textfield}
          onChange={(e) => handleChange(e)}
          error={errors.county ? true : false}
          helperText={errors.county && errors.county}
        >
          {formState.county}
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
          value={formState.phone}
          className={styles.textfield}
          onChange={(e) => handleChange(e)}
          error={errors.phone ? true : false}
          helperText={errors.phone}
        >
          {formState.phone}
        </TextField>
      </Grid>
    </form>
  );
};

export default ShippingAddress;
