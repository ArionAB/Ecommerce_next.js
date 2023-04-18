import React from "react";

import styles from "../../../styles/footer.module.scss";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export const Footer = () => {
  return (
    <div className={styles.container}>
      {/* <img src="/flower_honey.png" className={styles.flower_honey}></img> */}
      <Container className={styles.wrapper} maxWidth="xl">
        <Box className={styles.box}>
          <Typography variant="h6" className={styles.title}>
            Miere Polifloră
          </Typography>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere Polifloră
          </Link>
          <Link href="/miere/08db2e39-00f0-4ebc-8842-4e19089a51d1">
            Miere Polifloră cu Mixt de fructe
          </Link>
          <Link href="/miere/08db258d-1724-45be-8a38-9ad92e2e29aa">
            Miere Polifloră cu Mango
          </Link>
          <Link href="/miere/08db2dc6-2d02-4be8-8d90-478dbf79efe0">
            Miere Polifloră cu Aronia
          </Link>
          <Link href="/miere/08db2dc6-63b5-4d8c-88ad-246f9c66fc06">
            Miere Polifloră cu Cocos
          </Link>
          <Link href="/miere/08db3b28-ec84-4475-8d14-e8e6cd2705f5">
            Miere Polifloră cu Ananas
          </Link>
          <Link href="/miere/08db3b29-2193-4f73-8fec-fa685c47ed7a">
            Miere Polifloră cu Chipsuri de banane
          </Link>
          <Link href="/miere/08db2dc6-63b5-4d8c-88ad-246f9c66fc06">
            Miere Polifloră cu Cătină
          </Link>
          <Link href="/miere/08db2dc6-63b5-4d8c-88ad-246f9c66fc06">
            Miere Polifloră cu Merișoare
          </Link>
          <Link href="/miere/08db2dc6-63b5-4d8c-88ad-246f9c66fc06">
            Miere Polifloră cu Papaya
          </Link>
          <Link href="/miere/08db2dc6-63b5-4d8c-88ad-246f9c66fc06">
            Miere Polifloră cu Nucă
          </Link>
        </Box>
        <Box className={styles.box}>
          <Typography variant="h6" className={styles.title}>
            Miere de Salcâm
          </Typography>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Mixt de fructe
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Lamaie
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Ananas
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu chipsuri de Banane
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm Cătină
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm Merișoare
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Papaya
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Nucă
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Mango
          </Link>
          <Link href="/miere/08db3273-7ad7-4b0b-8f38-b0cc88505f69">
            Miere de Salcâm cu Aronia
          </Link>
        </Box>
        <Box className={styles.box}>
          <Typography variant="h6" className={styles.title}>
            Despre noi
          </Typography>
          <Link href="/about">Despre noi</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/articole">Articole</Link>
          <Link href="/retete">Rețete</Link>
          <Link href="/tos">Termeni și condiții</Link>
          <Link href="/retete">Politica de confidențialitate</Link>
          <Box className={styles.iconBox}>
            <EmailIcon />{" "}
            <a href="mailto: info@henighonig.ro">info@henighonig.ro</a>
          </Box>
          <Box className={styles.iconBox}>
            <LocalPhoneIcon />
            <a href="tel: +0741680054">0741680054</a>
          </Box>
          <Box className={styles.orar}>De luni până vineri 8.00 - 16.30 </Box>
          <Box className={styles.iconBox}>
            <Typography className={styles.social}>
              Let's bee social:{" "}
            </Typography>
            <FacebookIcon />
            <InstagramIcon />
          </Box>
        </Box>
      </Container>
    </div>
  );
};
