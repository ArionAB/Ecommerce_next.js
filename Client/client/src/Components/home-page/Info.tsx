import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Info = () => {
  return (
    <Container maxWidth="xl">
      <Grid container display="flex" justifyContent="space-between">
        <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
          <Image
            src="/delivery.svg"
            alt="miere naturală"
            width={150}
            height={100}
          />
          <Box paddingLeft={1}>
            <Typography fontWeight={600}>Transport Gratuit</Typography>
            <Typography fontSize={14}>La comenzile peste 200 de lei</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
          <Image
            src="/payment.svg"
            alt="miere naturală"
            width={150}
            height={100}
          />
          <Box paddingLeft={1}>
            <Typography fontWeight={600}>Plăți securizate</Typography>
            <Typography fontSize={14}>
              Toate plățile sunt securizate și encriptate
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
          <Image
            src="/natural.svg"
            alt="miere naturală"
            width={150}
            height={100}
          />
          <Box paddingLeft={1}>
            <Typography fontWeight={600}>Miere naturală</Typography>
            <Typography fontSize={14}>
              În zonele fără poluare se produce mierea de calitate
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Info;
