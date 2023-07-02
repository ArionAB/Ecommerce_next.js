import React from "react";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { useRouter } from "next/router";

export const Layout = ({ children }: any) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/checkout" ? null : <Navbar />}
      <main>{children}</main>
      {router.pathname === "/checkout" ? null : <Footer />}
    </>
  );
};
