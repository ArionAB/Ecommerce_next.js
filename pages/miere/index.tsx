import { useState, useEffect } from "react";
import { ProductItems } from "../../src/Components/home-page/ProductItems";
import { ReusableCarousel } from "../../src/Components/home-page/ReusableCarousel";
import { ProductItemModel } from "../../src/Store/Models/Product/ProductItem";
import { CustomDivider } from "../../src/Components/divider/CustomDivider";
import { Typography } from "@mui/material";
import styles from "../../styles/index.module.scss";

const Miere = () => {
  const [localStorageitems, setLocalStorageItems] = useState<
    ProductItemModel[]
  >([]);

  useEffect(() => {
    const localStorageItems = JSON.parse(
      localStorage?.getItem("recentlyViewed") || "[]"
    );

    setLocalStorageItems(
      localStorageItems.filter((item: ProductItemModel) => item.productId)
    );
  }, []);
  return (
    <>
      <ProductItems />
      {localStorageitems.length > 0 && (
        <>
          <CustomDivider />
          <Typography className={styles.title}>
            Produse vizualizate recent
          </Typography>
          <ReusableCarousel items={localStorageitems} />
        </>
      )}
    </>
  );
};

export default Miere;
