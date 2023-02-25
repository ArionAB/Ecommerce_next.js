import { Container } from "@mui/material";

import React, { useState } from "react";
import { AddItemForm } from "../src/Components/admin-page/AddItemForm";
import AdminOrders from "../src/Components/admin-page/admin-orders/AdminOrders";
import { TabsPanel } from "../src/Components/admin-page/Tabs";

const Admin = () => {
  const [value, setValue] = useState(0);

  return (
    <Container>
      <TabsPanel setValue={setValue} value={value} />
      {value === 0 && <AddItemForm />}
      {value === 1 && <AdminOrders />}
    </Container>
  );
};

export default Admin;
