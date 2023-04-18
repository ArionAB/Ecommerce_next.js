import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Typography, Grid, Skeleton } from "@mui/material";

import styles from "../../../styles/productItems.module.scss";
import { useAppDispatch, useAppSelector } from "../../Store";
import {
  selectLoadingItems,
  selectProductItems,
} from "../../Store/Selectors/productSelectors";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import Card from "../card/Card";
import { getProductItems } from "../../Store/Thunks/productThunks";

export const ProductItems = () => {
  const boxRef = useRef<any>(null);
  const containerRef = useRef(null);
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);
  const [honeyType, setHoneyType] = useState<HoneyType>(HoneyType.All);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [endOfContainer, setEndOfContainer] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const productItems = useAppSelector(selectProductItems);
  const loadingItems = useAppSelector(selectLoadingItems);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !productItems.length) {
      dispatch(getProductItems(""));
    }

    //eslint-disable-next-line
  }, [isMounted]);

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
          <Grid container flexWrap="wrap" justifyContent="center">
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

        <Grid container rowSpacing={5}>
          {productItems?.map((card, index) => {
            if (card.productCategory === honeyType) {
              return (
                <Grid
                  key={card.productId}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={styles.parent}
                >
                  <Box
                    sx={{
                      width: 300,
                      // position:
                      //   index === containerIndex ? "relative" : "absolute",
                      padding: 1,
                      // transition: "all 0.5s ease",
                    }}
                    className={styles.cardContainer}
                    onMouseEnter={() => {
                      setExpand(true);
                      setContainerIndex(index);
                    }}
                    onMouseLeave={() => {
                      setExpand(false);
                    }}
                  >
                    <Card
                      card={card}
                      expand={expand}
                      containerIndex={containerIndex}
                      index={index}
                      carousel={false}
                    />
                  </Box>
                </Grid>
              );
            } else if (honeyType === HoneyType.All) {
              return (
                <Grid
                  key={card.productId}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={styles.parent}
                >
                  <Box
                    sx={{
                      width: 300,

                      padding: 1,
                      // transition: "all 0.5s ease",
                    }}
                    className={styles.cardContainer}
                    onMouseEnter={() => {
                      setExpand(true);
                      setContainerIndex(index);
                    }}
                    onMouseLeave={() => {
                      setExpand(false);
                    }}
                  >
                    <Card
                      card={card}
                      expand={expand}
                      containerIndex={containerIndex}
                      index={index}
                      carousel={false}
                    />
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </Container>
  );
};
