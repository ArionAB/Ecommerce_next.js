import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { getAllRecipesIds, getRecipeData } from "../../lib/posts";
import { getDateMonthLabel } from "../../src/Utils/Functions/dateTimeFormat";
import { FC } from "react";

import styles from "../../styles/recipes.module.scss";
import { BlogType } from "../../src/Store/Enums/BlogType";

export async function getStaticPaths() {
  const paths = getAllRecipesIds(BlogType.ARTICOLE);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getRecipeData(params.id, BlogType.ARTICOLE);
  return {
    props: {
      postData,
    },
  };
}

export const Articole: FC<{ postData: any }> = ({ postData }) => {
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

export default Articole;
