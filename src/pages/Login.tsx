import { Fragment, useEffect, useState } from "react";
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
import {
  Controller,
  DefaultValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { userLogInAsync } from "../redux/reducers/userAuthentication/userLogInAsync";
import { useAppSelector } from "../app/hooks/useAppSelector";
import Footer from "../components/Footer";
import { LoginCredential } from "../types/User";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { user, error, loading } = useAppSelector((state) => state.authReducer);

  const defaultValues: DefaultValues<LoginCredential> = {
    email: "",
    password: "",
  };

  const formSchema = yup.object({
    email: yup.string().email("Email is not correct").required("Required"),
    password: yup.string().required("Required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginCredential>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleErroClose = () => {
    setShowError(false);
  };

  const userSinUp = () => {
    navigate("/register", { replace: true });
  };

  const onFormSubmit: SubmitHandler<LoginCredential> = async (data, event) => {
    event?.preventDefault();
    const email = data.email;
    const password = data.password;
    dispatch(userLogInAsync({ email, password }));
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
          <Box sx={{ mt: 1, width: "100%" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onFormSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    id="email"
                    margin="normal"
                    label="Enter your email"
                    error={error !== undefined && errors.email !== undefined}
                    variant="outlined"
                    autoFocus
                    {...field}
                  />
                )}
                name="email"
                control={control}
              />
              {errors.email && (
                <Typography color="red" width="100%">
                  {errors.email.message}
                </Typography>
              )}
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    id="password"
                    type="password"
                    margin="normal"
                    label="Enter your password"
                    variant="outlined"
                    error={error !== undefined && errors.password !== undefined}
                    {...field}
                  />
                )}
                name="password"
                control={control}
              />
              {errors.password && (
                <Typography color="red" width="100%">
                  {errors.password.message}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
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
