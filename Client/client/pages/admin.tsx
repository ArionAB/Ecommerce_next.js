import {
  Container,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import React, { useState } from "react";
import { AddItemForm } from "../src/Components/admin-page/AddItemForm";
import { TabsPanel } from "../src/Components/admin-page/Tabs";
import { SubCategoryItems } from "../src/Components/selectItems/SubCategoryItems";
import { productCategoryType } from "../src/Store/Enums/productCategory";

const Admin = () => {
  const [item, setItem] = useState<string>("");
  const [productType, setProductType] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <Container>
      <TabsPanel setProductType={setProductType} />
      {productType === productCategoryType.Baby && (
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-simple-select-label">Item</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item}
            label="Item"
            onChange={handleChange}
          >
            {SubCategoryItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <AddItemForm categoryType={item} productType={productType} />
    </Container>
  );
};

export default Admin;
