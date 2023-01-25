import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import styles from "../../../styles/login.module.scss";

const Login = () => {
  return (
    <Paper className={styles.login}>
      <Typography>You are not logged in!</Typography>
      <Button className={styles.loginBTN} variant="contained">
        Log in
      </Button>
    </Paper>
  );
};

export default Login;
