'use client'

import { FC } from "react";
import { FruitItems } from "../selectItems/FruitItems";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import styles from "../../../styles/productFilters.module.scss";
import { usePageWidth } from "../../Utils/Hooks/usePageWidth";

export const ProductFilters: FC<{
  setFilteredProducts: Function;
  filteredProducts: number[];
  mobile: boolean;
}> = ({ setFilteredProducts, filteredProducts, mobile }) => {
  const handleFilter = (value: number, e: any) => {
    if (e.target.checked) {
      setFilteredProducts([...filteredProducts, value]);
    } else {
      setFilteredProducts(filteredProducts.filter((item) => item !== value));
    }
  };
  const width = usePageWidth();

  return (
    <FormGroup
      className={styles.container}
      aria-hidden={mobile}
      sx={
        mobile
          ? { display: "block" }
          : !mobile && width > 900
            ? { display: "block" }
            : { display: "none !important" }
      }
    >
      {FruitItems.sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      }).map((item) => {
        return (
          <FormControlLabel
            key={item.value}
            className={styles.label}
            control={
              <Checkbox
                sx={{
                  color: "#344660",
                  "&.Mui-checked": {
                    color: "#344660",
                  },
                }}
                defaultChecked={filteredProducts.includes(item.value)}
              />
            }
            label={item.label}
            onClick={(e) => handleFilter(item.value, e)}
          />
        );
      })}
    </FormGroup>
  );
};
