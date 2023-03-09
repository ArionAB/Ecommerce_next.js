import { Box, Tabs, Tab } from "@mui/material";
import React, { FC } from "react";

export const TabsPanel: FC<{ setValue: Function; value: number }> = ({
  setValue,
  value,
}) => {
  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} aria-label="basic tabs example">
          <Tab label="Adauga produs" onClick={() => setValue(0)} />
          <Tab label="Comenzi" onClick={() => setValue(1)} />
          <Tab label="Utilizatori" onClick={() => setValue(2)} />
        </Tabs>
      </Box>
    </Box>
  );
};
