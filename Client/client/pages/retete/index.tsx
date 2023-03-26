import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useState, useRef } from "react";
import { getSortedRecipesData } from "../../lib/posts";
import Link from "next/link";
import styles from "../../styles/recipe_page.module.scss";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BlogType } from "../../src/Store/Enums/BlogType";

const Retete: FC<{ allPostsData: any }> = ({ allPostsData }) => {
  const [clientX, setClientX] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);

  const router = useRouter();
  const sliderRef = useRef<any>(null);
  const trackRef = useRef<any>(null);

  const getCorrectImage = (id: string) => {
    switch (id) {
      case "smores":
        return "/smores.webp";
      case "rosemary_pork":
        return "/rosemary_pork_tenderloin.webp";
      case "cajun_catfish":
        return "/cajun_catfish.jpg";
      case "hot_bacon":
        return "/hot_bacon.jpg";
      case "cheese_cake":
        return "/cheese_cake.webp";
    }
  };

  const homepage = router.pathname === "/";
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

    setPercentage(
      Math.min(
        0,
        Math.max(nextPercentage, -boxWidth! / allPostsData.length / 10)
      )
    );
  };
  //default value for max is -100

  const handleOnMouseUp = () => {
    setClientX(0);
    setPrevPercentage(percentage);
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setPercentage(
        Math.min(
          0,
          Math.max(percentage + 15, -boxWidth! / allPostsData.length / 10)
        )
      );
    } else {
      setPercentage(
        Math.min(
          0,
          Math.max(percentage - 15, -boxWidth! / allPostsData.length / 10)
        )
      );
    }
  };

  const handleOnTrack = (e: any) => {
    if (!homepage) return;
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
                transform: `translateX(${percentage}%)`,
              }}
              onMouseDown={handleOnMouseDown}
              onMouseMove={handleOnMouseMove}
              onMouseUp={handleOnMouseUp}
              ref={sliderRef}
            >
              {allPostsData?.map((data: any) => {
                return (
                  <Box key={data.id} className={styles.card}>
                    <Link href={`retete/${data.id}`}>
                      <Image
                        className={styles.image}
                        //@ts-ignore
                        src={getCorrectImage(data.id)}
                        alt={data.title}
                        width={300}
                        height={450}
                        draggable={false}
                      />
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
              <Link href={`retete/${data.id}`}>
                <Image
                  className={styles.image}
                  //@ts-ignore
                  src={getCorrectImage(data.id)}
                  alt={data.title}
                  width={300}
                  height={450}
                />
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
  const allPostsData = getSortedRecipesData(BlogType.RECIPES);
  return {
    props: {
      allPostsData,
    },
  };
}

export default Retete;
