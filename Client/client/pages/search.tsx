import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import styles from "../styles/search.module.scss";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../src/Store";
import {
  getPaginatedProductItems,
  getProductItems,
} from "../src/Store/Thunks/babyThunks";
import {
  selectFilters,
  selectPaginatedItems,
  selectProductItems,
} from "../src/Store/Selectors/productSelectors";
import { useDebounce } from "../src/Utils/Hooks/useDebounce";
import { resourceUrl } from "../src/Utils";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useRouter } from "next/router";
import { CategoriesFilter } from "../src/Components/categories-filter/CategoriesFilter";
import { BabyCategoryItems } from "../src/Components/selectItems/SubCategoryItems";
import Card from "../src/Components/card/Card";
import { ProductItemModel } from "../src/Store/Models/Product/ProductItem";
import { setSearchText } from "../src/Store/Slices/productSlice";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productItems = useAppSelector(selectProductItems);
  const filters = useAppSelector(selectFilters);

  useEffect(() => {
    if (searchInput.length > 0) {
      setOpenDialog(true);
      dispatch(getProductItems(searchInput));
    }

    //eslint-disable-next-line
  }, [debouncedSearchTerm]);

  useEffect(() => {
    dispatch(setSearchText(router.query.q as string));

    //eslint-disable-next-line
  }, [router.query.q]);

  const setUrlSearchParams = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { q: searchInput },
      },
      undefined,
      { shallow: true }
    );
  };
  const paginatedItems = useAppSelector(selectPaginatedItems);

  useEffect(() => {
    setUrlSearchParams();
    dispatch(
      getPaginatedProductItems({
        filters: filters,
      })
    );
  }, [filters]);

  const handleClickAway = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="xl">
      <Box className={styles.searchBox}>
        <Typography variant="h3" className={styles.search}>
          Search
        </Typography>
        {searchInput.length > 0 && openDialog && (
          <>
            <Box component="span" className={styles.triangle}></Box>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper elevation={3} className={styles.paper}>
                <Typography variant="subtitle1" className={styles.subtitle}>
                  Product
                </Typography>
                <Grid container spacing={2} p={2}>
                  {productItems?.productItems.slice(0, 6).map((item) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        key={item.productId}
                        className={styles.gridItem}
                      >
                        <img
                          src={resourceUrl + item.productPictures[0].filePath}
                          alt={item.title}
                          className={styles.productImage}
                        />
                        <Box>
                          <Typography className={styles.title}>
                            {item.title}
                          </Typography>
                          <Typography className={styles.price}>
                            {item.price} lei
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                {productItems.totalSearchResultItems > 6 && (
                  <Button
                    className={styles.viewAll}
                    endIcon={<TrendingFlatIcon />}
                    onClick={() => setUrlSearchParams()}
                  >
                    View all {productItems.totalSearchResultItems} products
                  </Button>
                )}
              </Paper>
            </ClickAwayListener>
          </>
        )}
      </Box>

      <TextField
        className={styles.searchInput}
        placeholder="What are you looking for?"
        onChange={(e) => setSearchInput(e.target.value)}
      ></TextField>

      <Typography className={styles.productsNumber}>
        Products ({productItems.totalItems})
      </Typography>

      <Box className={styles.filtersAndItems}>
        <CategoriesFilter
          priceRange={paginatedItems.priceRange}
          numberOfItems={paginatedItems.totalItemsPerCategory}
          categories={BabyCategoryItems}
        />
        <Grid container spacing={2} p={2}>
          {paginatedItems?.productItems.map((item, index) => {
            return (
              <Grid
                item
                xs={3}
                key={item.productId}
                className={styles.gridItem}
              >
                <Card
                  card={item}
                  expand={false}
                  index={index}
                  containerIndex={0}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Search;
