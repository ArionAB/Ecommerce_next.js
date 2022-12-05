import { Container } from "@mui/material";
import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        minHeight: "55px",
        alignItems: "center",
      }}
    >
      <Link href="/admin">Admin</Link>
      <Link href="/baby">Baby</Link>
      <Link href="/girls">Girls</Link>
      <Link href="/boys">Boys</Link>
      <Link href="/accesories">Accesories</Link>
      <Link href="/footwear">Footwear</Link>
    </Container>
  );
};
