import { FC } from "react";
import { getAllRecipesIds, getRecipeData } from "../../lib/posts";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { getDateMonthLabel } from "../../src/Utils/Functions/dateTimeFormat";

import styles from "../../styles/recipes.module.scss";
import { BlogType } from "../../src/Store/Enums/BlogType";

export async function getStaticPaths() {
  const paths = getAllRecipesIds(BlogType.RECIPES);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getRecipeData(params.id, BlogType.RECIPES);
  return {
    props: {
      postData,
    },
  };
}

const RecipeId: FC<{ postData: any }> = ({ postData }) => {
  return (
    <Container className={styles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Box className={styles.titleDate}>
        <Typography variant="h1" className={styles.title}>
          {postData.title}
        </Typography>
        <div className={styles.date}>{getDateMonthLabel(postData.date)}</div>
      </Box>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </Container>
  );
};

export default RecipeId;
