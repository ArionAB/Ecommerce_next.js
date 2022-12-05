import { Box } from "@mui/material";
import React, { FC } from "react";
import { BabyItemsCategoryModel } from "../../Store/Models/Baby/BabyItemsCategoryModel";

export const CategoriesFilter: FC<{
  categories: { value: number; label: string }[];
  numberOfItems: any;
}> = ({ categories, numberOfItems }) => {
  return (
    <Box>
      Categories
      {categories.map((category, index) => (
        <Box key={category.value}>
          {category.label} ({numberOfItems[`${category.label}`.toLowerCase()]})
        </Box>
      ))}
    </Box>
  );
};
