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

      <Container className={styles.wrapper} maxWidth="xl">
        <Box className={styles.box}>
          <Typography variant="h6" className={styles.title}>
            Miere Polifloră
          </Typography>
          <Link href="/miere/miere_poliflora">Miere Polifloră</Link>
          <Link href="/miere/Miere_cu_mixt_de_fructe">
            Miere Polifloră cu Mixt de fructe
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Mango">
            Miere Polifloră cu Mango
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Aronia">
            Miere Polifloră cu Aronia
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Cocos">
            Miere Polifloră cu Cocos
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Ananas">
            Miere Polifloră cu Ananas
          </Link>
          <Link href="/miere/Miere_polifloră_cu_chipsuri_de_Banane">
            Miere Polifloră cu Chipsuri de banane
          </Link>
          <Link href="/miere/Miere_polifloră_cu_cătină">
            Miere Polifloră cu Cătină
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Merișor">
            Miere Polifloră cu Merișoare
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Papaya">
            Miere Polifloră cu Papaya
          </Link>
          <Link href="/miere/Miere_polifloră_cu_Nucă">
            Miere Polifloră cu Nucă
          </Link>
          <Link href="/miere/Miere_polifloră_cu_ghimbir">
            Miere Polifloră cu Ghimbir
          </Link>
          <Link href="/miere/Miere_polifloră_cu_lamaie">
            Miere Polifloră cu Lamaie
          </Link>
          <Link href="/miere/Miere_polifloră_cu_fulgi_de_migdale">
            Miere Polifloră cu fulgi de Migdale
          </Link>
        </Box>
        <Box className={styles.box}>
          <Typography variant="h6" className={styles.title}>
            Miere de Salcâm
          </Typography>
          <Link href="/miere/Miere de Salcâm">Miere de Salcâm</Link>
          <Link href="/miere/Miere de Salcâm cu Mixt de fructe">
            Miere de Salcâm cu Mixt de fructe
          </Link>
          <Link href="/miere/Salcam cu lamaie">Miere de Salcâm cu Lamaie</Link>
          <Link href="/miere/Miere de salcâm cu Ananas">
            Miere de Salcâm cu Ananas
          </Link>
          <Link href="/miere/Miere de salcâm cu chipsuri de banane">
            Miere de Salcâm cu chipsuri de Banane
          </Link>
          <Link href="/miere/Miere de salcâm cu Cătină">
            Miere de Salcâm Cătină
          </Link>
          <Link href="/miere/Miere de Salcâm cu Merisor">
            Miere de Salcâm Merișoare
          </Link>
          <Link href="/miere/Miere de Salcâm cu Papaya">
            Miere de Salcâm cu Papaya
          </Link>
          <Link href="/miere/Miere de Salcâm cu Nucă">
            Miere de Salcâm cu Nucă
          </Link>
          <Link href="/miere/Miere de Salcâm cu Mango">
            Miere de Salcâm cu Mango
          </Link>
          <Link href="/miere/Miere de Salcâm cu Aronia">
            Miere de Salcâm cu Aronia
          </Link>
          <Link href="/miere/Miere de Salcâm cu Cocos">
            Miere de Salcâm cu Cocos
          </Link>
          <Link href="/miere/Miere de Salcâm cu Ghimbir">
            Miere de Salcâm cu Ghimbir
          </Link>
          <Link href="/miere/Miere de Salcâm cu Goji">
            Miere de Salcâm cu Goji
          </Link>
          <Link href="/miere/Miere de Salcâm cu fulgi de Migdale">
            Miere de Salcâm cu fulgi de Migdale
          </Link>
          <Link href="/miere/Miere de Salcâm cu Caju">
            Miere de Salcâm cu Caju
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
          <Link href="/delivery">Politica de livrare comandă</Link>

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
          {/* <Box className={styles.netopia}>
            <img
              title="NETOPIA Payments"
              src="netopia.svg"
              style={{ width: "100%", height: "100%" }}
            />
          </Box> */}
        </Box>
      </Container>
    </div>
  );
};
