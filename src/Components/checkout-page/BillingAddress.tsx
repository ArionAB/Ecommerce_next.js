'use client'

import { Typography, Grid, TextField } from "@mui/material/";
import styles from "../../../styles/checkout.module.scss";
import { FC, useState, useEffect } from "react";
import { useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { useFormState } from "../../Utils/Hooks/useReactForm";

const BillingAddress: FC<{
  setBilling: Function;
  sameAddress: boolean;
  isSubmitting: boolean;
  setHasErrors: Function;
  deliveryAddress: any;
}> = ({
  setBilling,
  sameAddress,
  isSubmitting,
  setHasErrors,
  deliveryAddress,
}) => {
    const [formState, setFormProp, setFormState] = useFormState({
      firstNameBill: "",
      lastNameBill: "",
      addressBill: "",
      infoBill: "",
      zipCodeBill: 0,
      cityBill: "",
      countyBill: "",
    });
    const [errors, setErrors] = useState({
      firstNameBill: "",
      lastNameBill: "",
      addressBill: "",
      cityBill: "",
      countyBill: "",
    });

    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {
      if (currentUser) {
        setFormState({
          firstNameBill: currentUser?.firstNameBill ?? "",
          lastNameBill: currentUser?.lastNameBill ?? "",
          addressBill: currentUser?.addressBill ?? "",
          infoBill: currentUser?.infoBill ?? "",
          zipCodeBill: currentUser?.zipCodeBill ?? "",
          cityBill: currentUser?.cityBill ?? "",
          countyBill: currentUser?.countyBill ?? "",
        });
      } else {
        const shippingAddress = localStorage.getItem("billing")
          ? JSON.parse(localStorage.getItem("billing")!)
          : null;
        if (shippingAddress) {
          setFormState({
            firstNameBill: shippingAddress?.firstNameBill || "",
            lastNameBill: shippingAddress?.lastNameBill || "",
            addressBill: shippingAddress?.addressBill || "",
            infoBill: shippingAddress?.infoBill || "",
            zipCodeBill: shippingAddress?.zipCodeBill || "",
            cityBill: shippingAddress?.cityBill || "",
            countyBill: shippingAddress?.countyBill || "",
          });
        }
      }

      //eslint-disable-next-line
    }, [currentUser]);

    const handleChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const { name, value } = e.target;
      //@ts-ignore
      setFormProp(name)(value);
      setErrors({ ...errors, [e.target.name]: "" });
    };

    useEffect(() => {
      if (!isSubmitting) return;
      let isError = false;
      const errors = {
        firstNameBill: "",
        lastNameBill: "",
        addressBill: "",
        cityBill: "",
        countyBill: "",
      };

      if (formState.firstNameBill === "") {
        errors.firstNameBill = "Numele este obligatoriu";
        isError = true;
      }
      if (formState.lastNameBill === "") {
        errors.lastNameBill = "Prenumele este obligatoriu";
        isError = true;
      }

      if (formState.addressBill === "") {
        errors.addressBill = "Adresa este obligatorie";
        isError = true;
      }
      if (formState.cityBill === "") {
        errors.cityBill = "Localitatea este obligatorie";
        isError = true;
      }
      if (formState.countyBill === "") {
        errors.countyBill = "Județul este obligatoriu";
        isError = true;
      }

      setErrors(errors);
      setHasErrors(isError);
    }, [isSubmitting, formState, setHasErrors]);

    useEffect(() => {
      setBilling(formState);

      //eslint-disable-next-line
    }, [formState]);

    useEffect(() => {
      if (!sameAddress) {
        setErrors({
          firstNameBill: "",
          lastNameBill: "",
          addressBill: "",
          cityBill: "",
          countyBill: "",
        });
        setFormState({
          firstNameBill: deliveryAddress.firstName,
          lastNameBill: deliveryAddress.lastName,
          addressBill: deliveryAddress.address,
          infoBill: deliveryAddress.info,
          zipCodeBill: deliveryAddress.zipCode,
          cityBill: deliveryAddress.city,
          countyBill: deliveryAddress.county,
        });
      }

      //eslint-disable-next-line
    }, [sameAddress]);

    return (
      <div>
        <form className={styles.form}>
          <Typography>Adresă de facturare</Typography>
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
                name="lastNameBill"
                value={formState.lastNameBill}
                onChange={(e) => handleChange(e)}
                className={styles.textfield}
                error={errors.lastNameBill ? true : false}
                helperText={errors.lastNameBill && errors.lastNameBill}
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
                name="firstNameBill"
                value={formState.firstNameBill}
                onChange={(e) => handleChange(e)}
                error={errors.firstNameBill ? true : false}
                helperText={errors.firstNameBill && errors.firstNameBill}
              >
                {formState.firstNameBill}
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
              name="addressBill"
              value={formState.addressBill}
              className={styles.textfield}
              onChange={(e) => handleChange(e)}
              error={errors.addressBill ? true : false}
              helperText={errors.addressBill && errors.addressBill}
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
              name="infoBill"
              value={formState.infoBill}
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
                name="zipCodeBill"
                value={formState.zipCodeBill}
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
                name="cityBill"
                value={formState.cityBill}
                className={styles.textfield}
                onChange={(e) => handleChange(e)}
                error={errors.cityBill ? true : false}
                helperText={errors.cityBill && errors.cityBill}
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
              name="countyBill"
              value={formState.countyBill}
              className={styles.textfield}
              onChange={(e) => handleChange(e)}
              error={errors.countyBill ? true : false}
              helperText={errors.countyBill && errors.countyBill}
            >
              {formState.countyBill}
            </TextField>
          </Grid>
        </form>
      </div>
    );
  };

export default BillingAddress;
