'use client'

import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import {
  List,
  ListItemText,
  ListItem,
  Drawer,
  IconButton,
  Typography,
  ClickAwayListener,
} from "@mui/material";
import styles from "../../../styles/hamburgerMenu.module.scss";
import { Box } from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "../../Store";
import { selectCartItems } from "../../Store/Selectors/cartSelectors";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogOut from "../sign-in-sign-up/LogOut";
import Login from "../sign-in-sign-up/Login";
import { Close } from "@mui/icons-material";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const currentUser = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <Box className={styles.ham_menu}>
      <IconButton
        edge="start"
        className={styles.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer}>
        <div className={styles.drawer}>
          <List>
            <ListItem button>
              <Link href="/miere" onClick={toggleDrawer}>
                <ListItemText primary="Miere" sx={{ width: "230px" }} />
              </Link>
              <ListItemText
                onClick={toggleDrawer}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "50px",
                  padding: " 0 10px",
                }}
              >
                <Close />
              </ListItemText>
            </ListItem>
            <ListItem button>
              <Link href="/cart" onClick={toggleDrawer}>
                <ListItemText primary="Coș" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/retete" onClick={toggleDrawer}>
                <ListItemText primary="Retete" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/articole" onClick={toggleDrawer}>
                <ListItemText primary="Articole" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/contact" onClick={toggleDrawer}>
                <ListItemText primary="Contact" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/about" onClick={toggleDrawer}>
                <ListItemText primary="Despre noi" />
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Box className={styles.navbar}>
        <Link href="/cart" className={styles.cartLink}>
          <ShoppingCartIcon />
          {cartItems.length > 0 && (
            <span className={styles.cartNumber}>{totalItems}</span>
          )}
        </Link>
        {currentUser ? (
          <Box
            aria-owns={isLogin ? "mouse-over-popover" : undefined}
            // onMouseEnter={(e) => {
            //   setCurrentTarget(e.currentTarget);
            //   setIsLogin(true);
            // }}
            // onMouseLeave={() => setIsLogin(false)}
            sx={{ position: "relative", cursor: "pointer" }}
            className={styles.login}
          >
            <PersonPinIcon /> {currentUser?.userName}
            {isLogin && currentUser && <LogOut />}
          </Box>
        ) : (
          <ClickAwayListener onClickAway={() => setIsLogin(false)}>
            <Typography
              aria-owns={isLogin ? "mouse-over-popover" : undefined}
              onClick={(e) => {
                setOpenDialog(true);
                setCurrentTarget(e.currentTarget);
                setIsLogin(true);
              }}
              sx={{ position: "relative", cursor: "pointer" }}
              className={styles.link}
            >
              Log in
              {isLogin && !currentUser && <Login />}
            </Typography>
          </ClickAwayListener>
        )}
      </Box>
    </Box>
  );
};

export default HamburgerMenu;
