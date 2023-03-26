import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState, FC, useEffect, useRef } from "react";
import { useAppSelector } from "../../Store";
import { selectProductItems } from "../../Store/Selectors/productSelectors";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "../../../styles/recommended.module.scss";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";
import Card from "../card/Card";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";

export const Recommended: FC<{ honeyType: HoneyType }> = ({ honeyType }) => {
  const [clientX, setClientX] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);
  const [honey, setHoney] = useState<HoneyType>(honeyType);
  const [expand, setExpand] = useState<boolean>(true);
  const [containerIndex, setContainerIndex] = useState<number>(0);
  const productItems = useAppSelector(selectProductItems);

  useEffect(() => {
    setHoney(honeyType);
  }, [honeyType]);

  const sliderRef = useRef<any>(null);
  const trackRef = useRef<any>(null);

  const boxWidth = sliderRef.current?.clientWidth;

  const handleOnMouseDown = (e: any) => {
    e.preventDefault();
    setClientX(e.clientX);
  };

  const handleOnMouseMove = (e: any) => {
    e.preventDefault();
    if (clientX === 0) return;
    const mouseDelta = clientX - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const currentPercentage = (mouseDelta / maxDelta) * -100;

    const nextPercentage = prevPercentage + currentPercentage;

    setPercentage(Math.min(0, Math.max(nextPercentage, -100)));
  };

  const handleOnMouseUp = () => {
    setClientX(0);
    setPrevPercentage(percentage);
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setPercentage(Math.min(0, Math.max(percentage + 15, -100)));
    } else {
      setPercentage(Math.min(0, Math.max(percentage - 15, -100)));
    }
  };

  const handleOnTrack = (e: any) => {
    const eleBounds = trackRef.current.getBoundingClientRect();
    const sliderBounds = sliderRef.current.getBoundingClientRect();

    let ret = false;

    if (
      e.clientX >= eleBounds.left &&
      e.clientX <= sliderBounds.left + sliderRef.current.offsetWidth
    ) {
      ret = true;
    } else {
      ret = false;

      handleOnMouseUp();
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography className={styles.title} variant="h5">
        We Think You`d like . . .
      </Typography>
      <Box
        className={styles.recommended}
        onMouseUp={handleOnMouseUp}
        ref={trackRef}
        onMouseMove={handleOnTrack}
      >
        <KeyboardArrowLeftIcon
          className={styles.arrow}
          onClick={() => handleArrowClick("left")}
        />
        <Box className={styles.image_track}>
          <Grid
            container
            rowGap={2}
            columnGap={2}
            className={styles.slider}
            sx={{
              transform: `translateX(${percentage}%)`,
            }}
            onMouseDown={handleOnMouseDown}
            onMouseMove={handleOnMouseMove}
            onMouseUp={handleOnMouseUp}
            ref={sliderRef}
          >
            {productItems?.map((card: ProductItemModel, index) => {
              if (card.productCategory === honey) {
                return (
                  <>
                    <Grid
                      key={card.productId}
                      item
                      // xs={3}
                      onMouseEnter={() => {
                        setExpand(true);
                        setContainerIndex(index);
                      }}
                      onMouseLeave={() => {
                        setExpand(false);
                      }}
                    >
                      <Box
                        sx={{
                          width: 300,
                          height:
                            expand && containerIndex === index ? 550 : 500,
                          padding: 1,
                          transition: "all 0.5s ease",
                        }}
                        className={styles.cardContainer}
                      >
                        <Card
                          card={card}
                          expand={expand}
                          containerIndex={containerIndex}
                          index={index}
                        />
                      </Box>
                    </Grid>
                  </>
                );
              } else if (honey === HoneyType.All) {
                return (
                  <>
                    <Grid
                      key={card.productId}
                      item
                      // xs={3}
                      onMouseEnter={() => {
                        setExpand(true);
                        setContainerIndex(index);
                      }}
                      onMouseLeave={() => {
                        setExpand(false);
                      }}
                    >
                      <Box
                        sx={{
                          width: 300,
                          height:
                            expand && containerIndex === index ? 550 : 500,
                          padding: 1,
                          transition: "all 0.5s ease",
                        }}
                        className={styles.cardContainer}
                      >
                        <Card
                          card={card}
                          expand={expand}
                          containerIndex={containerIndex}
                          index={index}
                        />
                      </Box>
                    </Grid>
                  </>
                );
              }
            })}
          </Grid>
        </Box>
        <KeyboardArrowRightIcon
          className={styles.arrow}
          onClick={() => handleArrowClick("right")}
        />
      </Box>
    </Container>
  );
};
