import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { getSortedRecipesData } from "../../lib/recipes";
import Link from "next/link";
import styles from "../../styles/recipe_page.module.scss";

const Retete: FC<{ allPostsData: any }> = ({ allPostsData }) => {
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

  return (
    <Container className={styles.container}>
      <Grid container gap={3}>
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
                height={400}
              />
              <Typography variant="h6" className={styles.title}>
                {data.title}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export async function getStaticProps() {
  const allPostsData = getSortedRecipesData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default Retete;
