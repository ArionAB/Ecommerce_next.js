import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import { CategoriesFilter } from "../src/Components/categories-filter/CategoriesFilter";
import { BabyCategoryItems } from "../src/Components/selectItems/CategoryItems";
import { useAppDispatch, useAppSelector } from "../src/Store";
import styles from "../styles/baby.module.scss";
import {
  selectProductItems,
  selectLoadingItems,
  selectFilters,
} from "../src/Store/Selectors/productSelectors";
import Card from "../src/Components/card/Card";
import { getProductItems } from "../src/Store/Thunks/babyThunks";
import { BabySizeItems } from "../src/Components/selectItems/BabySizeItems";
import { productCategoryType } from "../src/Store/Enums/productCategory";
import { useRouter } from "next/router";

const Baby = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const productItems = useAppSelector(selectProductItems);

  const loading = useAppSelector(selectLoadingItems);

  const filters = useAppSelector(selectFilters);

  useEffect(() => {
    dispatch(getProductItems(""));
  }, []);

  useEffect(() => {
    router.push(`baby/` + `/?ProductCategory=4`, undefined, { shallow: true });
  }, [filters]);

  return (
    <Container className={styles.babyContainer} maxWidth="xl">
      <Typography variant="h1">Baby Clothes</Typography>
      <Box className={styles.categoryWrapper}>
        <CategoriesFilter
          categories={BabyCategoryItems}
          numberOfItems={productItems.totalItemsPerCategory}
          sizes={BabySizeItems}
          numberOfSizes={productItems.totalSizes}
          priceRange={productItems.priceRange}
          productType={productCategoryType.Baby}
        />
        <Grid container rowGap={2}>
          {productItems.productItems?.map((card, index) => (
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
              >
                <Card
                  card={card}
                  expand={expand}
                  containerIndex={containerIndex}
                  index={index}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Baby;
