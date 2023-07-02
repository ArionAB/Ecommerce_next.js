'use client'

import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Skeleton,
  Button,
  Drawer,
} from "@mui/material";

import styles from "../../../styles/productItems.module.scss";
import { useAppDispatch, useAppSelector } from "../../Store";
import {
  selectLoadingItems,
  selectProductItems,
} from "../../Store/Selectors/productSelectors";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import Card from "../card/Card";
import { getProductItems } from "../../Store/Thunks/productThunks";
import { ProductFilters } from "./ProductFilters";
import TuneIcon from "@mui/icons-material/Tune";
import { Close } from "@mui/icons-material";

export const ProductItems = () => {
  const boxRef = useRef<any>(null);
  const containerRef = useRef(null);

  const [honeyType, setHoneyType] = useState<HoneyType>(HoneyType.All);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [endOfContainer, setEndOfContainer] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<number[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const productItems = useAppSelector(selectProductItems);
  const loadingItems = useAppSelector(selectLoadingItems);

  /*  useEffect(() => {
     setIsMounted(true);
     if (isMounted && !productItems.length) {
       dispatch(getProductItems(""));
     }
 
     //eslint-disable-next-line
   }, [isMounted]); */

  useEffect(() => {
    const containerElement = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5, // adjust threshold as needed
      }
    );

    const target = boxRef.current;

    if (target) {
      observer.observe(target);
    }

    if (containerElement) {
      observer.observe(containerElement);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }

      if (containerElement) {
        observer.unobserve(containerElement);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const containerElement = containerRef.current;
      if (containerElement) {
        //@ts-ignore
        const { bottom } = containerElement.getBoundingClientRect();
        const isAtEnd = bottom <= window.innerHeight;

        setEndOfContainer(isAtEnd);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container
      className={styles.ProductsContainer}
      maxWidth="xl"
      ref={containerRef}
    >
      <>
        <Box ref={boxRef} className={styles.honeyType}>
          <Typography variant="h2" className={styles.type}>
            TIP MIERE
          </Typography>

          <ul className={styles.selectType}>
            <li
              onClick={() => {
                setHoneyType(HoneyType.All);
              }}
              className={
                honeyType === HoneyType.All ? styles.active : styles.not_active
              }
            >
              Toate
            </li>
            <li
              onClick={() => {
                setHoneyType(HoneyType.Poliflora);
              }}
              className={
                honeyType === HoneyType.Poliflora
                  ? styles.active
                  : styles.not_active
              }
            >
              Polifloră
            </li>
            <li
              onClick={() => {
                setHoneyType(HoneyType.Salcam);
              }}
              className={
                honeyType === HoneyType.Salcam
                  ? styles.active
                  : styles.not_active
              }
            >
              Salcâm
            </li>
          </ul>
        </Box>

        {/* Conditionally render mobile Box component when isInViewport is true */}
        {!isInViewport && !endOfContainer && (
          <Box className={styles.honeyType_mobile}>
            <ul className={styles.selectType}>
              <li
                onClick={() => {
                  setHoneyType(HoneyType.All);
                  scrollToTop();
                }}
                className={
                  honeyType === HoneyType.All
                    ? styles.active
                    : styles.not_active
                }
              >
                Toate
              </li>
              <li
                onClick={() => {
                  setHoneyType(HoneyType.Poliflora);
                  scrollToTop();
                }}
                className={
                  honeyType === HoneyType.Poliflora
                    ? styles.active
                    : styles.not_active
                }
              >
                Polifloră
              </li>
              <li
                onClick={() => {
                  setHoneyType(HoneyType.Salcam);
                  scrollToTop();
                }}
                className={
                  honeyType === HoneyType.Salcam
                    ? styles.active
                    : styles.not_active
                }
              >
                Salcâm
              </li>
            </ul>
          </Box>
        )}
      </>
      <Box className={styles.categoryWrapper}>
        {loadingItems && (
          <Grid container className={styles.grid_container}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={280} />
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="text" width={300} height={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={280} />
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="text" width={300} height={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={280} />
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="text" width={300} height={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={280} />
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="text" width={300} height={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={280} />
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="text" width={300} height={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={280} />
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="text" width={300} height={50} />
            </Grid>
          </Grid>
        )}
        {!loadingItems && (
          <ProductFilters
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            mobile={false}
          />
        )}
        {(isInViewport || (!isInViewport && !endOfContainer)) && (
          <Button
            className={styles.drawerBTN}
            onClick={() => setOpenDrawer(true)}
            startIcon={<TuneIcon />}
          >
            Filtre
          </Button>
        )}

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box className={styles.filter_title}>
            <Typography variant="h6">Filtre</Typography>
            <Close onClick={() => setOpenDrawer(false)} />
          </Box>

          <ProductFilters
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            mobile={true}
          />
        </Drawer>

        {!loadingItems && (
          <Grid container className={styles.grid_container}>
            {productItems?.map((card, index) => {
              if (
                card.productCategory === honeyType &&
                filteredProducts?.includes(Number(card.fruitType))
              ) {
                return <Card card={card} index={index} carousel={false} />;
              } else if (
                card.productCategory === honeyType &&
                !filteredProducts.length
              ) {
                return <Card card={card} index={index} carousel={false} />;
              } else if (
                honeyType === HoneyType.All &&
                filteredProducts?.includes(Number(card.fruitType))
              ) {
                return <Card card={card} index={index} carousel={false} />;
              } else if (
                honeyType === HoneyType.All &&
                !filteredProducts.length
              ) {
                return <Card card={card} index={index} carousel={false} />;
              }
            })}
          </Grid>
        )}
      </Box>
    </Container>
  );
};
