import { Box, Container } from "@mui/material";
import { useState, useRef, FC, useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "../../../styles/reusableCarousel.module.scss";

import Card from "../card/Card";

export const ReusableCarousel: FC<any> = ({ items }) => {
  const [clientX, setClientX] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);
  const sliderRef = useRef<any>(null);
  const boxWidth = sliderRef.current?.clientWidth;
  const [cardWidth, setWidth] = useState<number>(0);

  const trackRef = useRef<any>(null);
  const trackWidth = trackRef.current?.clientWidth;

  const handleOnMouseDown = (e: any) => {
    e.preventDefault();
    setClientX(e.clientX);
  };

  useEffect(() => {
    setWidth(boxWidth / items?.length);
  }, [boxWidth]);

  const handleOnMouseMove = (e: any) => {
    e.preventDefault();
    if (clientX === 0) return;
    const diff = window?.innerWidth - trackWidth;
    const maxWidth = boxWidth - window?.innerWidth + diff + cardWidth - 100;
    const mouseDelta = clientX - e.clientX;
    const maxDelta = window.innerWidth; // Increase maxDelta value for less sensitivity

    const currentPercentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = prevPercentage + currentPercentage;

    // Convert currentPercentage to pixel value
    const totalLengthPixels = trackWidth; // Replace with the total length of the drag area in pixels
    const currentPixelValue = (currentPercentage / 100) * totalLengthPixels;
    const nextPixelValue = prevPercentage + currentPixelValue; // Add current pixel value to previous pixel value

    setPercentage(Math.min(0, Math.max(nextPixelValue, -maxWidth))); // Update transform property of sliderRef with pixel value
    setPrevPercentage(nextPercentage); // Update previous percentage
  };

  const handleOnMouseUp = () => {
    setClientX(0);
    setPrevPercentage(percentage);
  };
  const handleArrowClick = (direction: "left" | "right") => {
    const diff = window?.innerWidth - trackWidth;
    const maxWidth = boxWidth - window?.innerWidth + diff + cardWidth - 100;

    if (direction === "left") {
      setPercentage(Math.min(0, Math.max(percentage + cardWidth, -maxWidth)));
    } else {
      setPercentage(Math.min(0, Math.max(percentage - cardWidth, -maxWidth)));
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
    <Container
      className={styles.container}
      maxWidth="xl"
      onMouseUp={handleOnMouseUp}
      ref={trackRef}
      onMouseMove={handleOnTrack}
      onMouseLeave={handleOnMouseUp}
    >
      <>
        <KeyboardArrowLeftIcon
          className={styles.arrow}
          onClick={() => handleArrowClick("left")}
        />
        <Box className={styles.image_track}>
          <Box
            className={styles.slider}
            sx={{
              transform: `translateX(${percentage}px)`,
            }}
            onMouseDown={handleOnMouseDown}
            onMouseMove={handleOnMouseMove}
            onMouseUp={handleOnMouseUp}
            ref={sliderRef}
          >
            {items?.map((data: any, index: number) => {
              return (
                <Card
                  card={data}
                  expand={false}
                  index={index}
                  containerIndex={0}
                  carousel={true}
                />
              );
            })}
          </Box>
        </Box>
        <KeyboardArrowRightIcon
          className={styles.arrow}
          onClick={() => handleArrowClick("right")}
        />
      </>
    </Container>
  );
};
