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
import { UserType } from "../../Store/Enums/UserType";
import Head from "next/head";
import HamburgerMenu from "./HamburgerMenu";
import { CartModal } from "../cart-page/CartModal";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [cartTarget, setCartTarget] = useState<HTMLElement | null>(null);

  const currentUser = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = cartItems?.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <>
      <Box className={styles.container}>
        <Head>
          <title>Henig Honig, Miere naturală polifloră și salcâm</title>
          <meta
            name="description"
            content="Henig Honig, Miere naturală polifloră și salcâm"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container className={styles.navContainer}>
          {currentUser?.userType === UserType.Admin && (
            <Link href="/admin" className={styles.link}>
              Admin
            </Link>
          )}

          <Link href="/" className={styles.link}>
            Acasă
          </Link>
          <Link href="/miere" className={styles.link}>
            Miere
          </Link>
          <Link href="/about" className={styles.link}>
            Despre noi
          </Link>
          <Link href="/retete/" className={styles.link}>
            Rețete
          </Link>
          <Link href="/articole/" className={styles.link}>
            Articole
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Box
            aria-owns={cartModal ? "mouse-over-popover" : undefined}
            onMouseEnter={(e) => {
              setCartTarget(e.currentTarget);
              setCartModal(true);
            }}
            onMouseLeave={() => setCartModal(false)}
            sx={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Link href="/cart" className={styles.cartLink}>
              <ShoppingCartIcon />
              {cartItems?.length > 0 && (
                <span className={styles.cartNumber}>{totalItems}</span>
              )}
            </Link>
            {cartModal && <CartModal setOpenDialog={setOpenDialog} />}
          </Box>
          {currentUser ? (
            <Box
              aria-owns={isLogin ? "mouse-over-popover" : undefined}
              onMouseEnter={(e) => {
                setCurrentTarget(e.currentTarget);
                setIsLogin(true);
              }}
              onMouseLeave={() => setIsLogin(false)}
              sx={{ position: "relative" }}
              className={styles.login}
            >
              <PersonPinIcon /> {currentUser?.userName}
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
      <HamburgerMenu />
    </>
  );
};
