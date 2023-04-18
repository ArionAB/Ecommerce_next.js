import { Container, Typography } from "@mui/material";
import React, { useState, FC, useEffect } from "react";
import { useAppSelector } from "../../Store";
import { selectProductItems } from "../../Store/Selectors/productSelectors";

import styles from "../../../styles/recommended.module.scss";
import { HoneyType } from "../../Store/Enums/Product/HoneyType";

import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { ReusableCarousel } from "../home-page/ReusableCarousel";

export const Recommended: FC<{ honeyType: HoneyType }> = ({ honeyType }) => {
  const [honey, setHoney] = useState<HoneyType>(honeyType);
  const productItems = useAppSelector(selectProductItems);

  useEffect(() => {
    setHoney(honeyType);
  }, [honeyType]);

  const handleFilteredItems = () => {
    let items: ProductItemModel[] = [];

    productItems?.map((item: ProductItemModel) => {
      if (item.productCategory === 3) {
        items.push(item);
      } else if (honey === HoneyType.All) {
        items.push(item);
      }
    });
    return items;
  };

  useEffect(() => {
    handleFilteredItems();
  }, [productItems]);

  return (
    <Container maxWidth="xl">
      <Typography className={styles.title} variant="h5">
        We Think You`d like . . .
      </Typography>
      <ReusableCarousel items={handleFilteredItems()} />
    </Container>
  );
};
