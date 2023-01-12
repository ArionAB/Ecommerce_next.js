import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import { CategoriesFilter } from "../src/Components/categories-filter/CategoriesFilter";
import { FruitItems } from "../src/Components/selectItems/FruitItems";
import { useAppDispatch, useAppSelector } from "../src/Store";
import styles from "../styles/baby.module.scss";
import {
  selectProductItems,
  selectLoadingItems,
  selectFilters,
  selectPaginatedItems,
} from "../src/Store/Selectors/productSelectors";
import Card from "../src/Components/card/Card";
import { getProductItems } from "../src/Store/Thunks/productThunks";

import { useRouter } from "next/router";
import { CategoryItems } from "../src/Components/selectItems/CategoryItems";

const Home = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const productItems = useAppSelector(selectProductItems);
  const paginatedItems = useAppSelector(selectPaginatedItems);

  const loading = useAppSelector(selectLoadingItems);

  const filters = useAppSelector(selectFilters);

  useEffect(() => {
    dispatch(getProductItems(""));

    /*     dispatch(
      getPaginatedProductItems({
        filters: {
          PageNumber: router.query.PageNumber ?? "1",
          PageSize: router.query.PageSize ?? "10",
          MaxPrice:
            router.query.MaxPrice === "" ? "200" : router.query.MaxPrice,
          MinPrice: router.query.MinPrice === "" ? "1" : router.query.MinPrice,
          ProductCategory:
            router.query.ProductCategory === "0"
              ? "4"
              : router.query.ProductCategory,
          ProductSize: router.query.ProductSize ?? [],
          SubcategoryType:
            router.query.SubcategoryType === "0"
              ? "1"
              : router.query.SubcategoryType,
          SearchText: router.query.SearchText ?? "",
        },
      })
    ); */
  }, []);

  useEffect(() => {
    router.push({
      pathname: "/home",
      query: {
        ...filters,
      },
    });

    //eslint-disable-next-line
  }, [filters]);

  return (
    <Container className={styles.babyContainer} maxWidth="xl">
      <Typography variant="h1">Baby Clothes</Typography>
      <Box className={styles.categoryWrapper}>
        <CategoriesFilter
          categories={CategoryItems}
          numberOfItems={productItems.totalItemsPerCategory}
          fruits={FruitItems}
          numberOfSizes={productItems.totalSizes}
          priceRange={productItems.priceRange}
          // productType={productCategoryType.Baby}
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

export default Home;
