import React, { useState } from "react";
import { AddItemForm } from "../src/Components/admin-page/AddItemForm";
import AdminOrdersTable from "../src/Components/admin-page/admin-orders/AdminOrdersTable";
import { Statistics } from "../src/Components/admin-page/statistics/Statistics";

import { TabsPanel } from "../src/Components/admin-page/Tabs";
import { UsersTable } from "../src/Components/admin-page/users-page/UsersTable";
import withAuth from "../src/Utils/ProtectedRoutes/WithAuth";
import { Marketing } from "../src/Components/admin-page/marketing/Marketing";

const Admin = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <TabsPanel setValue={setValue} value={value} />
      {value === 0 && <AddItemForm />}
      {value === 1 && <AdminOrdersTable />}
      {value === 2 && <UsersTable />}
      {value === 3 && <Statistics />}
      {value === 4 && <Marketing />}
    </>
  );
};

export default withAuth(Admin, true);
