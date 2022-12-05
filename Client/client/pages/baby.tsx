import React, { useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { CategoriesFilter } from "../src/Components/categories-filter/CategoriesFilter";
import { BabyCategoryItems } from "../src/Components/selectItems/CategoryItems";

import styles from "../styles/baby.module.scss";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { getBabyItems } from "../src/Store/Thunks/babyThunks";
import {
  selectBabyItems,
  selectLoadingItems,
} from "../src/Store/Selectors/babySelectors";
import Card from "../src/Components/card/Card";

const Baby = () => {
  const dispatch = useAppDispatch();

  const babyItems = useAppSelector(selectBabyItems);

  const loading = useAppSelector(selectLoadingItems);

  useEffect(() => {
    dispatch(getBabyItems({}));
  }, []);
  return (
    <Container className={styles.babyContainer}>
      <Typography variant="h1">Baby Clothes</Typography>
      <CategoriesFilter
        categories={BabyCategoryItems}
        numberOfItems={babyItems.totalItemsPerCategory}
      />
      {babyItems.babyItems?.map((card) => (
        <Paper key={card.babyId}>
          <Card card={card} />
        </Paper>
      ))}
    </Container>
  );
};

export default Baby;
