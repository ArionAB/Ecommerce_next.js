import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState, FC, useEffect } from "react";
import { useAppSelector } from "../../Store";
import { selectProductItems } from "../../Store/Selectors/productSelectors";

import styles from "../../../styles/recommended.module.scss";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import Card from "../card/Card";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";

export const Recommended: FC<{ honeyType: HoneyType }> = ({ honeyType }) => {
  const [honey, setHoney] = useState<HoneyType>(honeyType);
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);
  const productItems = useAppSelector(selectProductItems);

  useEffect(() => {
    setHoney(honeyType);
  }, [honeyType]);

  return (
    <Container maxWidth="xl">
      <Typography className={styles.title} variant="h5">
        We Think You`d like . . .
      </Typography>
      <Grid container rowGap={2}>
        {productItems?.map((card: ProductItemModel, index) => {
          if (card.productCategory === honey) {
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
          } else if (honey === HoneyType.All) {
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
    </Container>
  );
};
