import {
  Box,
  Button,
  Container,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../src/Store";
import { requestResetPassword } from "../../src/Store/Thunks/userThunks";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const passWordref = useRef<HTMLInputElement>(null);
  const confirmPassWordref = useRef<HTMLInputElement>(null);
  const { resetPassword } = router?.query;
  const token: any = resetPassword?.slice(6);
  const dispatch = useAppDispatch();

  const submitForm = () => {
    const password = passWordref.current && passWordref.current.value;
    const confirmPassword =
      confirmPassWordref.current && confirmPassWordref.current.value;

    if (password === confirmPassword) {
      dispatch(
        requestResetPassword({
          password: password!,
          confirmPassword: confirmPassword!,
          token: token!,
        })
      );
    } else {
      setErrorMessage("Parolele trebuie sa fie identice");
    }
  };

  return (
    <Container>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputLabel htmlFor="password">Parola</InputLabel>
            <TextField
              id="password"
              inputRef={passWordref}
              sx={{
                marginBottom: "20px",
              }}
            />
            <InputLabel htmlFor="confirmPassword">Confirmă parola</InputLabel>
            <TextField id="confirmPassword" inputRef={confirmPassWordref} />
            {errorMessage && (
              <Typography
                sx={{
                  color: "#d32f2f ",
                  padding: "10px",
                }}
              >
                {errorMessage}
              </Typography>
            )}
            <Button
              onClick={() => submitForm()}
              variant="contained"
              sx={{
                backgroundColor: "rgba(47, 31, 34, 1)",
                marginTop: "20px",
              }}
            >
              Trimite
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
