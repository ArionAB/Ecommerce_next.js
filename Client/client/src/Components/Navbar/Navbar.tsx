import { Container, Typography, Dialog, Box } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import Login from "../sign-in-sign-up/Login";
import Signup from "../sign-in-sign-up/Signup";
import { useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogOut from "../sign-in-sign-up/LogOut";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { selectCartItems } from "../../Store/Selectors/cartSelectors";
import styles from "../../../styles/navbar.module.scss";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector(selectCartItems);

  return (
    <Box className={styles.container}>
      <Container className={styles.navContainer}>
        <Link href="/admin" className={styles.link}>
          Admin
        </Link>
        <Link href="/" className={styles.link}>
          Acasă
        </Link>

        <Link href="/cart" className={styles.cartLink}>
          <ShoppingCartIcon />
          {currentUser && (
            <span className={styles.cartNumber}>{cartItems?.length}</span>
          )}
        </Link>
        {currentUser ? (
          <Box
            aria-owns={isLogin ? "mouse-over-popover" : undefined}
            onMouseEnter={(e) => {
              setCurrentTarget(e.currentTarget);
              setIsLogin(true);
            }}
            onMouseLeave={() => setIsLogin(false)}
            sx={{ position: "relative", cursor: "pointer" }}
            className={styles.login}
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
            className={styles.link}
          >
            Log in
            {isLogin && !currentUser && <Login />}
          </Typography>
        )}

        <Dialog open={openDialog} maxWidth="md">
          <Signup setOpenDialog={setOpenDialog} />
        </Dialog>
      </Container>
    </Box>
  );
};
