import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { productCategoryType } from "../../Store/Enums/productCategory";

export const TabsPanel = ({ setProductType }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number, productType: number) => {
    setValue(newValue);

    setProductType(productType);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} aria-label="basic tabs example">
          <Tab
            label="Baby"
            onClick={() => handleChange(0, productCategoryType.Baby)}
          />
          <Tab
            label="Girls"
            onClick={() => handleChange(1, productCategoryType.Girls)}
          />
          <Tab
            label="Boys"
            onClick={() => handleChange(2, productCategoryType.Boys)}
          />
          <Tab
            label="Accesories"
            onClick={() => handleChange(3, productCategoryType.Accesories)}
          />
          <Tab
            label="Footwear"
            onClick={() => handleChange(4, productCategoryType.Footwear)}
          />
        </Tabs>
      </Box>
    </Box>
  );
};
