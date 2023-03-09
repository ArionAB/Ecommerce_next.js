import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { resourceUrl } from "../../Utils";
import styles from "../../../styles/recentlyViewed.module.scss";
import { Typography } from "@mui/material";

export const RecentlyViewedCard: FC<{ card: ProductItemModel }> = ({
  card,
}) => {
  const [imageSource, setImageSource] = useState<string>(
    card.productPictures[0]?.filePath
  );

  const imageLoader = () => {
    return `${resourceUrl}${imageSource}`;
  };

  return (
    <Link
      key={card.productId}
      href="/miere/[productDetails]"
      as={`/miere/${card.productId}`}
    >
      <Image
        src={resourceUrl + imageSource}
        onMouseEnter={() => {
          setImageSource(card.productPictures[1]?.filePath);
        }}
        onMouseLeave={() => {
          setImageSource(card.productPictures[0]?.filePath);
        }}
        loader={imageLoader}
        alt={card.title}
        width={280}
        height={350}
        quality={100}
        unoptimized={true}
      ></Image>
      <Typography variant="h6" className={styles.price}>
        {card.priceKg} lei <span>1kg</span>
      </Typography>
      <Typography className={styles.title}>{card.title}</Typography>
    </Link>
  );
};
