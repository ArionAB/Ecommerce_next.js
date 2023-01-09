import { Container, Typography, Dialog, Box } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import Login from "../sign-in-sign-up/Login";
import Signup from "../sign-in-sign-up/Signup";
import { useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogOut from "../sign-in-sign-up/LogOut";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const currentUser = useAppSelector(selectCurrentUser);

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
      <Link href="/home">Home</Link>

      <Link href="/search">Search</Link>
      <Link href="/cart">Cart</Link>
      {currentUser ? (
        <Box
          aria-owns={isLogin ? "mouse-over-popover" : undefined}
          onMouseEnter={(e) => {
            setCurrentTarget(e.currentTarget);
            setIsLogin(true);
          }}
          onMouseLeave={() => setIsLogin(false)}
          sx={{ position: "relative", cursor: "pointer" }}
        >
          <PersonPinIcon /> {currentUser?.username}
          {isLogin && currentUser && <LogOut />}
        </Box>
      ) : (
        <Typography
          aria-owns={isLogin ? "mouse-over-popover" : undefined}
          onMouseEnter={(e) => {
            setCurrentTarget(e.currentTarget);
            setIsLogin(true);
          }}
          onMouseLeave={() => setIsLogin(false)}
          onClick={() => setOpenDialog(true)}
          sx={{ position: "relative", cursor: "pointer" }}
        >
          Log in
          {isLogin && !currentUser && <Login />}
        </Typography>
      )}

      <Dialog open={openDialog} maxWidth="md">
        <Signup setOpenDialog={setOpenDialog} />
      </Dialog>
    </Container>
  );
};
