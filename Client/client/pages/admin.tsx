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

const Admin = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [item, setItem] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <Container>
      <TabsPanel setCurrentTab={setCurrentTab} />
      {currentTab === 0 && (
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-simple-select-label">Item</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item}
            label="Item"
            onChange={handleChange}
          >
            <MenuItem value={2}>Bodysuit</MenuItem>
            <MenuItem value={3}>Coverall</MenuItem>
          </Select>
        </FormControl>
      )}

      <AddItemForm categoryType={item} />
    </Container>
  );
};

export default Admin;
