import React, { FC, useState, useRef, useEffect } from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { RecentlyViewedCard } from "./RecentlyViewedCard";
import styles from "../../../styles/recentlyViewed.module.scss";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const RecentlyViewed: FC<{ items: ProductItemModel[] }> = ({
  items,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const currentImageCardWidthAndGap = 312;

  const handleArrowClick = (direction: "left" | "right") => {
    const sliderWidth = currentImageCardWidthAndGap * items.length;
    const width = sliderWidth / currentSlide;

    if (direction === "left") {
      if (currentSlide === 0) {
        setCurrentSlide(1);
      }
      setCurrentSlide((prev) => prev - 1);
    } else {
      if ((currentSlide > 0 && width > 650) || width === Infinity) {
        setCurrentSlide((prev) => prev + 1);
      } else return;
    }
  };

  useEffect(() => {
    const boxWidth = sliderRef.current?.clientWidth;
    if (!boxWidth) return;
    const itemsWidth = currentImageCardWidthAndGap * items.length;
    if (itemsWidth < boxWidth) {
      setDisabled(true);
    }

    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Paper className={styles.productsContainer}>
        <Typography variant="h6" className={styles.title}>
          Produse vizualizate recent
        </Typography>
        <Box className={styles.withArrows}>
          <NavigateNextIcon
            data-disabled={disabled}
            onClick={() => handleArrowClick("right")}
          />

          <Box className={styles.items} ref={sliderRef}>
            <div className={styles.flickity_viewport}>
              <div
                className={styles.flickity_slider}
                style={{
                  transform: `translateX(-${
                    currentSlide * currentImageCardWidthAndGap
                  }px)`,
                }}
              >
                {items?.map((card: ProductItemModel) => {
                  return (
                    <RecentlyViewedCard key={card.productId} card={card} />
                  );
                })}
              </div>
            </div>
          </Box>
          <NavigateBeforeIcon
            onClick={() => handleArrowClick("left")}
            data-disabled={disabled}
          />
        </Box>
      </Paper>
    </Container>
  );
};
