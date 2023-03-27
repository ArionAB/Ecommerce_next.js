import { Facebook, Instagram } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import styles from "../styles/contact.module.scss";
import { sendContactForm } from "../lib/contact";

const Contact = () => {
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSendEmail = async () => {
    try {
      await sendContactForm({ data: { email, comment } });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Container className={styles.container}>
      <Box>
        <Typography className={styles.contact}>Contact</Typography>
        <Box className={styles.box}>
          <Typography className={styles.title}>Henig Honig</Typography>
          <Typography className={styles.info}>
            Sediu: Bogdan Petriceicu Hasdeu, ALba Iulia, Alba
          </Typography>
          <Typography className={styles.info}>CUI: 214214</Typography>
          <Typography className={styles.info}>CIF: RO2312534</Typography>
        </Box>
        <Box className={styles.box}>
          <Typography className={styles.title}>Punct de lucru:</Typography>
          <Typography className={styles.info}>
            Str. Mihai Eminescu, nr. 1, Alba Iulia, Alba
          </Typography>
        </Box>
        <Box className={styles.box}>
          <Typography className={styles.title}>Contact:</Typography>
          <Typography className={styles.info}>info@henighonig.ro</Typography>
          <Typography className={styles.info}>0741680054</Typography>
        </Box>
        <Box className={styles.box}>
          Suntem disponibili de luni până vineri între orele 8.00-16.30
        </Box>
        <Box className={styles.box}>
          <Typography className={styles.title}>Nr. cont:</Typography>
          <Typography className={styles.info}>Banca Transilvania</Typography>
          <Typography className={styles.info}>
            IBAN: RO12BTRLRONCRT1234567890123456
          </Typography>
        </Box>
        <Box className={styles.box}>
          <Typography className={styles.title}>
            Urmărește-ne pe rețelele sociale:
          </Typography>
          <Instagram />
          <Facebook />
        </Box>
      </Box>
      <Paper className={styles.askUs} elevation={3}>
        <Typography className={styles.title}>Întreabă-ne</Typography>
        <form className={styles.form}>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
            className={styles.textfield}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
            }}
          />
          <TextField
            multiline
            rows={8}
            label="Comentariu"
            value={comment || ""}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textfield}
            InputProps={{
              classes: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
            }}
          />
          <Button variant="contained" onClick={() => handleSendEmail()}>
            Trimite
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Contact;
