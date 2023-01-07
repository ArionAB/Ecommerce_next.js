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

const LogOut = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(requestLogout(currentUser?.jwtToken));
  };

  return (
    <Paper className={styles.logout}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Comenzile tale</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Coșul tău</ListItemText>
        </MenuItem>
      </MenuList>
      <Button className={styles.logoutBTN} onClick={() => handleLogout()}>
        Log out
      </Button>
    </Paper>
  );
};

export default LogOut;
