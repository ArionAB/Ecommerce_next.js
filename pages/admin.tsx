'use client'

import dynamic  from "next/dynamic"
import React, { useState } from "react";
import { TabsPanel } from "../src/Components/admin-page/Tabs";
import withAuth from "../src/Utils/ProtectedRoutes/WithAuth";





//@ts-ignore
const AddItemForm = dynamic(()=> import("../src/Components/admin-page/AddItemForm"), { ssr: false })
//@ts-ignore
const AdminOrdersTable = dynamic(()=> import("../src/Components/admin-page/AdminOrdersTable"), { ssr: false })
//@ts-ignore
const UsersTable = dynamic(()=> import("../src/Components/admin-page/UsersTable"), { ssr: false })
//@ts-ignore
const Statistics = dynamic(()=> import("../src/Components/admin-page/Statistics"),{ ssr: false })
//@ts-ignore
const Marketing = dynamic(()=> import("../src/Components/admin-page/Marketing"), { ssr: false })

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
