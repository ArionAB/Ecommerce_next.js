import Close from "@mui/icons-material/Close";
import { Box, Paper, Tab, Tabs, Typography, Button } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import React, { useState, FC } from "react";
import styles from "../../../styles/signup.module.scss";
import { useAppDispatch } from "../../Store";
import { loginUser, registerUser } from "../../Store/Thunks/userThunks";
import { emailRegex } from "../../Utils/Functions/emailRegex";

const Signup: FC<{ setOpenDialog: any }> = ({ setOpenDialog }) => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  const [tabValue, setTabValue] = useState(0);

  const dispatch = useAppDispatch();

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogin = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setLoginError({ ...loginError, [e.target.name]: "", errorMessage: "" });
  };

  const submitLogin = () => {
    let isError = false;
    const errors = {
      email: "",
      password: "",
      errorMessage: "",
    };

    if (login.email.length === 0) {
      errors.email = "Email is required";
      isError = true;
    }
    if (!emailRegex(login.email)) {
      errors.email = "Email is not valid";
      isError = true;
    }
    if (login.password.length === 0) {
      errors.password = "Password is required";
      isError = true;
    }
    setLoginError(errors);

    if (!isError) {
      dispatch(
        loginUser({
          data: login,
        })
      ).then((res) => {
        if (res.payload.success) {
          setOpenDialog(false);
        } else {
          setLoginError({ ...loginError, errorMessage: res.payload });
        }
      });
    }
  };

  const handleRegister = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
    setRegisterError({ ...registerError, [e.target.name]: "" });
  };

  const submitRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let isError = false;
    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };

    if (register.name.length < 3) {
      errors.name = "Name must contain at least 3 characters";
      isError = true;
    }
    if (!emailRegex(register.email)) {
      errors.email = "Email is not valid";
      isError = true;
    }
    if (register.password.length < 6) {
      errors.password = "Password must contain at least 6 characters";
      isError = true;
    }
    if (register.password !== register.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isError = true;
    }

    setRegisterError(errors);

    if (!isError) {
      dispatch(
        registerUser({
          data: register,
        })
      ).then((res) => {
        if (res.payload === "Inregistrat cu success!") {
          dispatch(
            loginUser({
              data: {
                email: register.email,
                password: register.password,
              },
            })
          ).then(() => setOpenDialog(false));
        }

        if (res.payload === "Email-ul este deja folosit") {
          setRegisterError({
            ...registerError,
            errorMessage: res.payload,
          });
        }
      });
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (tabValue === 0) {
        submitRegister(e as any);
      } else {
        submitLogin();
      }
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenDialog(false)}>
      <Paper className={styles.signup} onKeyDown={handleEnterPress}>
        <Box className={styles.loginBox}>
          <Box></Box>
          <Typography className={styles.title}>
            {tabValue === 1 ? "Log in" : "Înregistrează-te"}
          </Typography>
          <Close
            sx={{ float: "right", cursor: "pointer" }}
            onClick={() => setOpenDialog(false)}
          />
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTab}
          centered
          TabIndicatorProps={{ style: { background: "#344660" } }}
          className={styles.tabs}
        >
          <Tab
            label="Sign Up"
            className={tabValue === 0 ? styles.activeTab : styles.tab}
            value={0}
          />
          <Tab
            label="Log in"
            className={tabValue === 1 ? styles.activeTab : styles.tab}
            value={1}
          />
        </Tabs>
        {tabValue === 0 && (
          <form>
            <Box className={styles.formBox}>
              <InputLabel>
                <Typography>Nume</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  className={styles.textfield}
                  onChange={(e) => handleRegister(e)}
                  name="name"
                  helperText={registerError.name && registerError.name}
                  error={registerError.name ? true : false}
                  sx={
                    registerError
                      ? { minHeight: "80px" }
                      : { minHeight: "auto" }
                  }
                />
              </InputLabel>
              <InputLabel>
                <Typography>Email</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  className={styles.textfield}
                  onChange={(e) => handleRegister(e)}
                  name="email"
                  helperText={registerError.email && registerError.email}
                  error={registerError.email ? true : false}
                  sx={
                    registerError
                      ? { minHeight: "80px" }
                      : { minHeight: "auto" }
                  }
                />
              </InputLabel>
              <InputLabel>
                <Typography>Parola</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  className={styles.textfield}
                  onChange={(e) => handleRegister(e)}
                  name="password"
                  helperText={registerError.password && registerError.password}
                  error={registerError.password ? true : false}
                  sx={
                    registerError
                      ? { minHeight: "80px" }
                      : { minHeight: "auto" }
                  }
                />
              </InputLabel>
              <InputLabel>
                <Typography>Confirmă parola</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  className={styles.textfield}
                  onChange={(e) => handleRegister(e)}
                  name="confirmPassword"
                  helperText={
                    registerError.confirmPassword &&
                    registerError.confirmPassword
                  }
                  error={registerError.confirmPassword ? true : false}
                  sx={
                    registerError
                      ? { minHeight: "80px" }
                      : { minHeight: "auto" }
                  }
                />
              </InputLabel>
              {}
            </Box>
            {registerError.errorMessage && (
              <Typography className={styles.errorMessage}>
                {registerError.errorMessage}
              </Typography>
            )}
            <Box className={styles.registerBox}>
              <Button
                variant="contained"
                className={styles.registerBTN}
                onClick={(e) => submitRegister(e)}
              >
                Register
              </Button>
            </Box>
          </form>
        )}
        {tabValue === 1 && (
          <form>
            <Box className={styles.formBox}>
              <InputLabel>
                <Typography>Email</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  className={styles.textfield}
                  onChange={(e) => handleLogin(e)}
                  name="email"
                  helperText={loginError.email && loginError.email}
                  error={loginError.email ? true : false}
                  sx={
                    loginError ? { minHeight: "80px" } : { minHeight: "auto" }
                  }
                />
              </InputLabel>
              <InputLabel>
                <Typography>Parola</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  className={styles.textfield}
                  onChange={(e) => handleLogin(e)}
                  name="password"
                  helperText={loginError.password && loginError.password}
                  error={loginError.password ? true : false}
                  sx={
                    loginError ? { minHeight: "80px" } : { minHeight: "auto" }
                  }
                />
              </InputLabel>
            </Box>
            {loginError.errorMessage && (
              <Typography className={styles.errorMessage}>
                {loginError.errorMessage}
              </Typography>
            )}
            <Box className={styles.registerBox}>
              <Button
                variant="contained"
                className={styles.registerBTN}
                onClick={() => submitLogin}
              >
                Log in
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </ClickAwayListener>
  );
};

export default Signup;
