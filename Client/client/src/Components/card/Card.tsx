import React, { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import Image from "next/image";
import { resourceUrl } from "../../Utils";
import styles from "../../../styles/card.module.scss";
import { Options } from "../modals/Options";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";

const Card: FC<{
  card: ProductItemModel;

  expand: boolean;
  containerIndex: number;
  index: number;
}> = ({ card, expand, containerIndex, index }) => {
  const [imageSource, setImageSource] = useState<string>(
    card.productPictures[0].filePath
  );
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const imageLoader = () => {
    return `${resourceUrl}${imageSource}`;
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  return (
    <Box className={styles.cardContainer} component="div">
      <Link href={`/baby/${card.productId}`}>
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
          unoptimized={true}
        ></Image>
      </Link>
      <Typography variant="h6" className={styles.price}>
        {card.price} lei
      </Typography>
      <Typography className={styles.title}>{card.title}</Typography>
      {expand && containerIndex === index && (
        <Box className={styles.twoButtons}>
          <Button className={styles.shop}>Quick Shop</Button>
          <Button
            className={styles.options}
            onClick={() => setOpenOptions(true)}
          >
            Choose Options
          </Button>
        </Box>
      )}
      <Dialog open={openOptions}>
        <Options handleClose={handleCloseOptions} card={card} />
      </Dialog>
    </Box>
  );
};

export default Card;
