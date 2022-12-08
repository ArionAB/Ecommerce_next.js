import React, { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import Image from "next/image";
import { resourceUrl } from "../../Utils";
import styles from "../../../styles/card.module.scss";

const Card: FC<{
  card: ProductItemModel;

  expand: boolean;
  containerIndex: number;
  index: number;
}> = ({ card, expand, containerIndex, index }) => {
  const [imageSource, setImageSource] = useState<string>(
    card.productPictures[0].filePath
  );

  const imageLoader = () => {
    return `${resourceUrl}${imageSource}`;
  };

  return (
    <Box className={styles.cardContainer} component="div">
      <Image
        src={resourceUrl + imageSource}
        onMouseEnter={() => {
          setImageSource(card.productPictures[1].filePath);
        }}
        onMouseLeave={() => {
          setImageSource(card.productPictures[0].filePath);
        }}
        loader={imageLoader}
        alt="ceva"
        width={280}
        height={400}
        quality={100}
      ></Image>
      <Typography variant="h6" className={styles.price}>
        {card.price} lei
      </Typography>
      <Typography className={styles.title}>{card.title}</Typography>
      {expand && containerIndex === index && (
        <Box className={styles.twoButtons}>
          <Button className={styles.shop}>Quick Shop</Button>
          <Button className={styles.options}>Choose Options</Button>
        </Box>
      )}
    </Box>
  );
};

export default Card;
