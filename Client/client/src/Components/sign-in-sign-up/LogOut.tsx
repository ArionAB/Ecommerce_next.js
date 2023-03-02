import React from "react";
import { useAppDispatch, useAppSelector } from "../../Store";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import styles from "../../../styles/logout.module.scss";
import { requestLogout } from "../../Store/Thunks/userThunks";
import Link from "next/link";
import { useRouter } from "next/router";

const LogOut = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(requestLogout(currentUser?.jwtToken)).then(() => {
      router.push("/");
    });
  };

  return (
    <Paper className={styles.logout}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <Link href="/orders">
            <ListItemText>Comenzile tale</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Link href="/cart"> Coșul tău</Link>
          </ListItemText>
        </MenuItem>
      </MenuList>
      <Button className={styles.logoutBTN} onClick={() => handleLogout()}>
        Log out
      </Button>
    </Paper>
  );
};

export default LogOut;
