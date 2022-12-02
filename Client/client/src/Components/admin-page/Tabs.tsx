import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

export const TabsPanel = ({ setCurrentTab }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} aria-label="basic tabs example">
          <Tab label="Baby" onClick={() => handleChange(0)} />
          <Tab label="Girls" onClick={() => handleChange(1)} />
          <Tab label="Boys" onClick={() => handleChange(2)} />
          <Tab label="Accesories" onClick={() => handleChange(3)} />
          <Tab label="Footwear" onClick={() => handleChange(4)} />
        </Tabs>
      </Box>
    </Box>
  );
};
