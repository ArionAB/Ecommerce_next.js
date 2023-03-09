import React, { useState } from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";

import styles from "../../../styles/productItems.module.scss";
import { useAppSelector } from "../../Store";
import { selectProductItems } from "../../Store/Selectors/productSelectors";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import Card from "../card/Card";

export const ProductItems = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);
  const [honeyType, setHoneyType] = useState<HoneyType>(HoneyType.All);

  const productItems = useAppSelector(selectProductItems);
  return (
    <Container className={styles.ProductsContainer} maxWidth="xl">
      <Box className={styles.honeyType}>
        <Typography variant="h2" className={styles.type}>
          TIP MIERE
        </Typography>

        <ul className={styles.selectType}>
          <li
            onClick={() => setHoneyType(HoneyType.All)}
            className={
              honeyType === HoneyType.All ? styles.active : styles.not_active
            }
          >
            Toate
          </li>
          <li
            onClick={() => setHoneyType(HoneyType.Poliflora)}
            className={
              honeyType === HoneyType.Poliflora
                ? styles.active
                : styles.not_active
            }
          >
            Polifloră
          </li>
          <li
            onClick={() => setHoneyType(HoneyType.Salcam)}
            className={
              honeyType === HoneyType.Salcam ? styles.active : styles.not_active
            }
          >
            Salcâm
          </li>
        </ul>
      </Box>
      <Box className={styles.categoryWrapper}>
        <Grid container rowGap={2}>
          {productItems?.map((card, index) => {
            if (card.productCategory === honeyType) {
              return (
                <>
                  <Grid
                    key={card.productId}
                    item
                    xs={3}
                    onMouseEnter={() => {
                      setExpand(true);
                      setContainerIndex(index);
                    }}
                    onMouseLeave={() => {
                      setExpand(false);
                    }}
                  >
                    <Paper
                      sx={{
                        width: 300,
                        height: expand && containerIndex === index ? 550 : 500,
                        padding: 1,
                        transition: "all 0.5s ease",
                      }}
                      className={styles.cardContainer}
                      elevation={1}
                    >
                      <Card
                        card={card}
                        expand={expand}
                        containerIndex={containerIndex}
                        index={index}
                      />
                    </Paper>
                  </Grid>
                </>
              );
            } else if (honeyType === HoneyType.All) {
              return (
                <>
                  <Grid
                    key={card.productId}
                    item
                    xs={3}
                    onMouseEnter={() => {
                      setExpand(true);
                      setContainerIndex(index);
                    }}
                    onMouseLeave={() => {
                      setExpand(false);
                    }}
                  >
                    <Paper
                      sx={{
                        width: 300,
                        height: expand && containerIndex === index ? 550 : 500,
                        padding: 1,
                        transition: "all 0.5s ease",
                      }}
                      className={styles.cardContainer}
                      elevation={1}
                    >
                      <Card
                        card={card}
                        expand={expand}
                        containerIndex={containerIndex}
                        index={index}
                      />
                    </Paper>
                  </Grid>
                </>
              );
            }
          })}
        </Grid>
      </Box>
    </Container>
  );
};
