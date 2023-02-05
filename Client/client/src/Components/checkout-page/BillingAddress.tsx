import { Typography, Grid, TextField } from "@mui/material/";
import styles from "../../../styles/checkout.module.scss";
import { FC, useState, useEffect } from "react";
import { useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";

const BillingAddress: FC<{ setBilling: Function }> = ({ setBilling }) => {
  const [shipping, setShipping] = useState({
    firstNameBill: "",
    lastNameBill: "",
    addressBill: "",
    infoBill: "",
    zipCodeBill: "",
    cityBill: "",
    countyBill: "",
    phoneBill: "",
  });

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    setShipping({
      firstNameBill: currentUser?.firstNameBill || "",
      lastNameBill: currentUser?.lastNameBill || "",
      addressBill: currentUser?.addressBill || "",
      infoBill: currentUser?.infoBill || "",
      zipCodeBill: currentUser?.zipCodeBill || "",
      cityBill: currentUser?.cityBill || "",
      countyBill: currentUser?.countyBill || "",
      phoneBill: currentUser?.phoneBill || "",
    });
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setBilling(shipping);

    //eslint-disable-next-line
  }, [shipping]);

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
              value={shipping.lastNameBill}
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
              name="firstNameBill"
              value={shipping.firstNameBill}
              onChange={(e) => handleChange(e)}
            >
              {shipping.firstNameBill}
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
            value={shipping.addressBill}
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
            name="infoBill"
            value={shipping.infoBill}
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
              value={shipping.zipCodeBill}
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
              value={shipping.cityBill}
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
            name="countyBill"
            value={shipping.countyBill}
            className={styles.textfield}
            onChange={(e) => handleChange(e)}
          >
            {shipping.countyBill}
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
            name="phoneBill"
            value={shipping.phoneBill}
            className={styles.textfield}
            onChange={(e) => handleChange(e)}
          >
            {shipping.phoneBill}
          </TextField>
        </Grid>
      </form>
    </div>
  );
};

export default BillingAddress;
