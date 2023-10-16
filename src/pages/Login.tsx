import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  TextField,
  Typography,
  Link,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { purple } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { userLogInAsync } from "../redux/reducers/userAuthentication/userLogInAsync";
import { useAppSelector } from "../app/hooks/useAppSelector";
import Footer from "../components/Footer";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { user, error, loading } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleErroClose = () => {
    setShowError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;

    if (email && password) {
      dispatch(userLogInAsync({ email, password }));
    }
  };

  const userSinUp = () => {
    navigate("/register", { replace: true });
  };
  return (
    <Fragment>
      <Container maxWidth="xs">
        {user && <Navigate to="/" replace={true} />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: purple[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">SignIn</Typography>
          <Typography variant="h6">
            Please enter you email and password
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              id="outlined-password-input"
              margin="normal"
              required
              fullWidth
              label="Enter your password"
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Don't have an account ?</Typography>
              <Link component="button" variant="body2" onClick={userSinUp}>
                Sign Up
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={handleErroClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">user credential is not valid ,{error}</Alert>
      </Snackbar>
      <Footer />
    </Fragment>
  );
};

export default Login;
