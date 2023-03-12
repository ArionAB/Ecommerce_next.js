import React, { FC, useState, useRef, useEffect } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { RecentlyViewedCard } from "./RecentlyViewedCard";
import styles from "../../../styles/recentlyViewed.module.scss";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const RecentlyViewed = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [items, setItems] = useState<ProductItemModel[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage?.getItem("recentlyViewed") || "[]"));
  }, []);

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
      {items.length && (
        <Paper className={styles.productsContainer}>
          <Typography variant="h6" className={styles.recentViewed}>
            Produse vizualizate recent
          </Typography>
          <Box className={styles.withArrows}>
            <NavigateBeforeIcon
              data-disabled={disabled}
              onClick={() => handleArrowClick("left")}
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
            <NavigateNextIcon
              onClick={() => handleArrowClick("right")}
              data-disabled={disabled}
            />
          </Box>
        </Paper>
      )}
    </Container>
  );
};
