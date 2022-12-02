import { Container } from "@mui/material";
import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Container>
      <Link href="/admin">Admin</Link>
    </Container>
  );
};
