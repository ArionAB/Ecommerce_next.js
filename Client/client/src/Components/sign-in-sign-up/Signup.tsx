import Close from "@mui/icons-material/Close";
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import React, { useState, FC } from "react";
import styles from "../../../styles/signup.module.scss";
import { useAppDispatch, useAppSelector } from "../../Store";
import {
  forgotPassword,
  loginUser,
  registerUser,
} from "../../Store/Thunks/userThunks";
import { emailRegex } from "../../Utils/Functions/emailRegex";
import { selectIsLoggingIn } from "../../Store/Selectors/authenticationSelectors";
import { addAppNotification } from "../../Store/Slices/appNotificationSlice";

const Signup: FC<{ setOpenDialog: any }> = ({ setOpenDialog }) => {
  const [loadingRegister, setLoadingRegister] = useState(false);
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

  const [forgotEmail, setForgotEmail] = useState("");

  const [tabValue, setTabValue] = useState(0);

  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectIsLoggingIn);

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

  const submitRegister = () => {
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
      setLoadingRegister(true);
      dispatch(
        registerUser({
          data: register,
        })
      ).then((res) => {
        setLoadingRegister(false);
        if (res.payload.message.text === "Inregistrat cu success!") {
          dispatch(
            addAppNotification({
              message: "Inregistrat cu success!",
              severity: "success",
            })
          );
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
    if (e.key === "Enter" && tabValue === 0) {
      submitRegister();
    } else if (e.key === "Enter" && tabValue === 1) {
      submitLogin();
    }
  };

  const sendResetPassword = () => {
    dispatch(forgotPassword(forgotEmail));
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenDialog(false)}>
      <Paper className={styles.signup} onKeyDown={handleEnterPress}>
        <Box className={styles.loginBox}>
          <Box></Box>
          <Typography className={styles.title}>
            {tabValue === 0
              ? "Înregistrează-te"
              : tabValue === 1
              ? "Logare"
              : tabValue === 2
              ? "Ai uitat parola?"
              : ""}
          </Typography>
          <Close
            sx={{ float: "right", cursor: "pointer" }}
            onClick={() => setOpenDialog(false)}
          />
        </Box>
        {tabValue === 2 ? (
          <Typography textAlign="center" p={4}>
            Te rugăm să introduci adresa de e-mail. O să îți trimitem un e-mail
            pentru a putea reseta parola.
          </Typography>
        ) : (
          <Tabs
            value={tabValue}
            onChange={handleTab}
            centered
            TabIndicatorProps={{ style: { background: "#344660" } }}
            className={styles.tabs}
          >
            <Tab
              label="Înregistrează-te"
              className={tabValue === 0 ? styles.activeTab : styles.tab}
              value={0}
            />
            <Tab
              label="Logare"
              className={tabValue === 1 ? styles.activeTab : styles.tab}
              value={1}
            />
          </Tabs>
        )}

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
                onClick={() => submitRegister()}
                disabled={loadingRegister}
                startIcon={
                  loadingRegister ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    ""
                  )
                }
              >
                Înregistrează-te acum
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
            <Typography
              onClick={() => setTabValue(2)}
              className={styles.forgotPassword}
            >
              Ai uitat parola?
            </Typography>
            <Box className={styles.registerBox}>
              <Button
                variant="contained"
                className={styles.registerBTN}
                onClick={() => submitLogin()}
                disabled={isLogging}
                startIcon={
                  isLogging ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    ""
                  )
                }
              >
                Logare
              </Button>
            </Box>
          </form>
        )}
        {tabValue === 2 && (
          <form>
            <Box className={styles.resetPassword}>
              <InputLabel>
                <Typography>Adresa ta de e-mail</Typography>
                <TextField
                  InputProps={{
                    classes: {
                      root: styles.cssOutlinedInput,
                      focused: styles.cssFocused,
                      notchedOutline: styles.notchedOutline,
                    },
                  }}
                  fullWidth
                  className={styles.textfield}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </InputLabel>

              <Button
                className={styles.resetPasswordBTN}
                onClick={() => sendResetPassword()}
              >
                Resetează parola
              </Button>
            </Box>
            <Typography
              className={styles.noAccount}
              onClick={() => setTabValue(0)}
            >
              Încă nu ai cont? Înregistrează-te acum
            </Typography>
          </form>
        )}
      </Paper>
    </ClickAwayListener>
  );
};

export default Signup;
