import { Box, Collapse, Slider, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ProductSizesModel } from "../../Store/Models/Product/ProductSizesModel";
import { useAppDispatch, useAppSelector } from "../../Store";

import styles from "../../../styles/categoryFilters.module.scss";
import {
  setMaxPrice,
  setMinPrice,
  setProductCategory,
  setProductSize,
  setSubcategoryType,
} from "../../Store/Slices/productSlice";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { BabySizeType } from "../../Store/Enums/Baby/BabySizeType";
import { productCategoryType } from "../../Store/Enums/productCategory";
import { useRouter } from "next/router";
import { selectFilters } from "../../Store/Selectors/productSelectors";

export const CategoriesFilter: FC<{
  categories: { value: number; label: string }[];
  sizes?: { value: string; label: string; filterLabel: string }[];
  numberOfItems: any;
  numberOfSizes?: ProductSizesModel;
  priceRange: { minPrice: number; maxPrice: number };
  productType?: productCategoryType;
}> = ({
  categories,
  numberOfItems,
  sizes,
  numberOfSizes,
  priceRange,
  productType,
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [openSize, setOpenSize] = useState<boolean>(true);
  const [openPrice, setOpenPrice] = useState<boolean>(true);
  const [middleRange, setMiddleRange] = useState<number>(0);
  const [thumbValue, setThumbValue] = useState<any>([]);
  const [checkedSizes, setCheckedSizes] = useState<any>({
    zeroToThree: false,
    threeToSix: false,
    sixToNine: false,
    nineToTwelve: false,
    twelveToEighteen: false,
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const filters = useAppSelector(selectFilters);

  console.log(priceRange);

  useEffect(() => {
    if (priceRange) setMiddleRange(priceRange.maxPrice / 5);
  }, [priceRange]);

  const marks = [
    {
      value: priceRange?.minPrice,
      label: priceRange?.minPrice,
    },

    {
      value: middleRange * 3,
      label: middleRange * 3,
    },

    {
      value: priceRange?.maxPrice,
      label: priceRange?.maxPrice,
    },
  ];

  const changeValue = (event: any, value: any) => {
    setThumbValue(value);
  };

  const handleSizeType = (name: string) => {
    setCheckedSizes({
      ...checkedSizes,
      [name]: !checkedSizes[name],
    });
  };

  const handleSubcategoryType = (value: number) => {
    dispatch(setSubcategoryType(value));
    router.push(
      {
        pathname: router.pathname,
        query: { subcategoryType: value },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    let sizesArray = [];

    if (checkedSizes.zeroToThree) sizesArray.push(BabySizeType.ZeroToThree);
    if (checkedSizes.threeToSix) sizesArray.push(BabySizeType.ThreeToSix);
    if (checkedSizes.sixToNine) sizesArray.push(BabySizeType.SixToNine);
    if (checkedSizes.nineToTwelve) sizesArray.push(BabySizeType.NineToTwelve);
    if (checkedSizes.twelveToEighteen)
      sizesArray.push(BabySizeType.TwelveToEighteen);

    dispatch(setProductSize(sizesArray));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedSizes]);

  useEffect(() => {
    dispatch(setMinPrice(thumbValue[0]));
    router.push(
      {
        pathname: router.pathname,
        query: { minPrice: thumbValue[0] },
      },
      undefined,
      { shallow: true }
    );
    dispatch(setMaxPrice(thumbValue[1]));
    router.push(
      {
        pathname: router.pathname,
        query: { minPrice: thumbValue[1] },
      },
      undefined,
      { shallow: true }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbValue]);

  useEffect(() => {
    dispatch(setProductCategory(productType));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productType]);

  return (
    <Box p={2}>
      <Box className={styles.categoriesContainer}>
        <Box onClick={() => setOpen(!open)} className={styles.categoriesTitle}>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          <Typography className={styles.categories}>Cateogries</Typography>
        </Box>
        <Collapse orientation="vertical" in={open}>
          {categories?.map((category, index) => (
            <Box
              key={category.value}
              className={styles.number}
              onClick={() => handleSubcategoryType(category.value)}
            >
              {category.label}
              <Box component="span" className={styles.sizeNumber}>
                ({numberOfItems[`${category.label}`.toLowerCase()]})
              </Box>
            </Box>
          ))}
        </Collapse>
      </Box>
      {sizes && (
        <Box className={styles.categoriesContainer}>
          <Box
            onClick={() => setOpenSize(!openSize)}
            className={styles.categoriesTitle}
          >
            {openSize ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            <Typography className={styles.categories}>Size</Typography>
          </Box>

          <Collapse orientation="vertical" in={openSize}>
            <FormGroup>
              {sizes?.map((size) => (
                <Box
                  key={size.value}
                  className={styles.number}
                  onClick={(e) => handleSizeType(size.filterLabel)}
                >
                  <Box className={styles.checkbox}>
                    <Checkbox
                      checked={checkedSizes[size.filterLabel]}
                      name={size.filterLabel}
                      color="secondary"
                    />
                    <Typography>{size.label}</Typography>
                  </Box>
                  <Box component="span" className={styles.sizeNumber}>
                    (
                    {numberOfSizes &&
                      numberOfSizes[
                        size?.filterLabel as keyof typeof numberOfSizes
                      ]}
                    )
                  </Box>
                </Box>
              ))}
            </FormGroup>
          </Collapse>
        </Box>
      )}
      <Box className={styles.categoriesContainer}>
        <Box
          onClick={() => setOpenPrice(!openPrice)}
          className={styles.categoriesTitle}
        >
          {openPrice ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          <Typography className={styles.categories}>Price</Typography>
        </Box>
        <Box className={styles.inputBox}>
          <input type="number" value={thumbValue[0]} />
          -
          <input type="number" value={thumbValue[1]} />
        </Box>
        <Collapse orientation="vertical" in={openPrice}>
          <Slider
            sx={{
              color: "#344660",
              height: 2,
              padding: "15px 0",
            }}
            marks={priceRange && marks}
            classes={{
              thumb: styles.thumb,
              track: styles.track,
              rail: styles.rail,
              mark: styles.mark,
              markLabel: styles.markLabel,
            }}
            aria-labelledby="range-slider"
            defaultValue={[0, 100]}
            onChange={changeValue}
          />
        </Collapse>
      </Box>
    </Box>
  );
};
