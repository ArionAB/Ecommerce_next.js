import { Box, Container, Grid, Typography } from "@mui/material";
import { useState, useRef, FC, useEffect } from "react";
import { getSortedRecipesData } from "../../lib/posts";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import styles from "../../styles/recipe_page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { BlogType } from "../../src/Store/Enums/BlogType";

const Articole: FC<{ allPostsData: any }> = ({ allPostsData }) => {
  const [clientX, setClientX] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);
  const [cardWidth, setWidth] = useState<number>(0);
  //mobile
  const [startX, setStartX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const router = useRouter();

  const sliderRef = useRef<any>(null);
  const trackRef = useRef<any>(null);
  const trackWidth = trackRef.current?.clientWidth;

/*   const getCorrectImage = (id: string) => {
    switch (id) {
      case "vaccine_save":
        return "/vaccine_save.webp";
      case "propolis":
        return "/propolis.webp";
    }
  }; */

  const homepage = router.pathname === "/";
  const boxWidth = sliderRef.current?.clientWidth;

  const handleOnMouseDown = (e: any) => {
    e.preventDefault();
    setClientX(e.clientX);
  };

  useEffect(() => {
    setWidth(boxWidth / allPostsData?.length);
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
    >
      {homepage ? (
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
              onTouchStart={(e) => {
                setClientX(e.touches[0].clientX);
                setStartX(e.touches[0].clientX);
                setIsDragging(true);
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                const diff = window?.innerWidth - trackWidth;
                const maxWidth =
                  boxWidth - window?.innerWidth + diff + cardWidth - 100;
                const currentX = e.touches[0].clientX;
                const mouseDelta = startX - currentX;
                const maxDelta = window.innerWidth;
                const currentPercentage = (mouseDelta / maxDelta) * -100;
                const nextPercentage = prevPercentage + currentPercentage;
                const totalLengthPixels = trackWidth;
                const currentPixelValue =
                  (currentPercentage / 100) * totalLengthPixels;
                const nextPixelValue = prevPercentage + currentPixelValue;
                setPercentage(Math.min(0, Math.max(nextPixelValue, -maxWidth)));
                setPrevPercentage(nextPercentage);
              }}
              onTouchEnd={() => {
                setIsDragging(false);
                setClientX(0);
                setPrevPercentage(percentage);
              }}
              onTouchCancel={() => {
                setIsDragging(false);
                setClientX(0);
                setPrevPercentage(percentage);
              }}
              ref={sliderRef}
            >
              {allPostsData?.map((data: any) => {
                return (
                  <Box key={data.id} className={styles.card}>
                    <Link href={`articole/${data.id}`}>
                    {/*   <Image
                        className={styles.image}
                        //@ts-ignore
                        src={getCorrectImage(data.id)}
                        alt={data.title}
                        width={300}
                        height={450}
                        draggable={false}
                      /> */}
                      <Typography variant="h6" className={styles.title}>
                        {data.title}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <KeyboardArrowRightIcon
            className={styles.arrow}
            onClick={() => handleArrowClick("right")}
          />
        </>
      ) : (
        <Grid container gap={3} className={styles.card_container}>
          {allPostsData?.map((data: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2.8}
              key={data.id}
              className={styles.card}
            >
              <Link href={`articole/${data.id}`}>
             {/*    <Image
                  className={styles.image}
                  //@ts-ignore
                  src={getCorrectImage(data.id)}
                  alt={data.title}
                  width={300}
                  height={450}
                /> */}
                <Typography variant="h6" className={styles.title}>
                  {data.title}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedRecipesData(BlogType.ARTICOLE);
  return {
    props: {
      allPostsData,
    },
  };
}

export default Articole;
