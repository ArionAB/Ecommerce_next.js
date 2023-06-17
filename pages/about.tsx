import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "../styles/about.module.scss";

const About = () => {
  return (
    <Container maxWidth="xl" className={styles.container}>
      <Typography variant="h3" className={styles.title}>
        Despre noi
      </Typography>
      <Typography variant="h5" className={styles.firstP}>
        Suntem o afacere familială de apicultură din Henig, Alba, care a luat
        naștere dintr-o pasiune împărtășită de un tată și fiu. De peste 35 de
        ani, am cultivat și recoltat cele mai bune produse de miere, oferind
        clienților noștri produse organice, sănătoase și nutritive.
      </Typography>
      <Box
        className={`${styles.wildflowers_container} ${styles.container_right}`}
      >
      {/*   <Image
          src="/wildflowers1.jpg"
          alt="miere din flori de câmp"
          width={1920}
          height={768}
          layout="responsive"
        /> */}
        <Box className={`${styles.wildflower_text} ${styles.text_right}`}>
          <Typography variant="h5" className={styles.wildflower_title}>
            Diversitate Florală
          </Typography>
          <Box component="p" className={styles.wilderflower_paragraph}>
            Regiunea Henig este cunoscută pentru o diversitate florală
            impresionantă, ceea ce face ca mierea noastră să fie cu adevărat
            unică. Avem norocul de a fi înconjurați de o varietate de flori și
            plante, care oferă albinelor noastre nectarul necesar pentru a
            produce miere de cea mai bună calitate.
          </Box>
        </Box>
      </Box>
      <Box
        className={`${styles.wildflowers_container} ${styles.container_left}`}
      >
  {/*       <Image
          src="/wildflowers3.jpg"
          alt="miere din flori de câmp"
          width={1920}
          height={768}
          layout="responsive"
        /> */}
        <Box className={`${styles.wildflower_text} ${styles.text_left}`}>
          <Typography variant="h5" className={styles.wildflower_title}>
            Sol bogat
          </Typography>
          <Box component="p" className={styles.wilderflower_paragraph}>
            Un alt factor care face mierea noastră atât de specială este solul
            bogat în potasiu din regiunea Henig. Această substanță minerală
            esențială este absorbită de plantele din zonă, dând mierii noastre o
            aromă puternică și complexă. Potasiul îmbunătățește, de asemenea,
            gustul mierii și o face să fie mai dulce și mai bogată în minerale
            esențiale.
          </Box>
        </Box>
      </Box>
      <Box
        className={`${styles.wildflowers_container} ${styles.container_right}`}
      >
        <Image
          src="/beekeeper.jpg"
          alt="miere din flori de câmp"
          width={1920}
          height={768}
          layout="responsive"
        />
        <Box className={`${styles.wildflower_text} ${styles.text_right}`}>
          <Typography variant="h5" className={styles.wildflower_title}>
            Henig Honig
          </Typography>
          <Box component="p" className={styles.wilderflower_paragraph}>
            Suntem mândri de faptul că putem oferi clienților noștri o miere de
            calitate superioară, care este bogată în arome și beneficii pentru
            sănătate. Fiecare pahar de miere este o explozie de gust și aromă,
            care va fi sigur un deliciu pentru papilele voastre gustative.
          </Box>
        </Box>
      </Box>
      <Box
        className={`${styles.wildflowers_container} ${styles.container_left}`}
      >
      {/*   <Image
          src="/healthy_bees.jpg"
          alt="miere din flori de câmp"
          width={1920}
          height={768}
          layout="responsive"
        /> */}
        <Box className={`${styles.wildflower_text} ${styles.text_left}`}>
          <Typography variant="h5" className={styles.wildflower_title}>
            #SaveTheBees
          </Typography>
          <Box component="p" className={styles.wilderflower_paragraph}>
            Pentru a ne asigura că albinele noastre sunt sănătoase și fericite,
            folosim numai tratamente naturale și nu utilizăm substanțe chimice
            nocive. Credem cu tărie că metodele naturale de tratament sunt cele
            mai eficiente și mai sigure pentru sănătatea albinelor și pentru
            mediul înconjurător.
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
