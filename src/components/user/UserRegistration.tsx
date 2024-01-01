import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { purple } from "@mui/material/colors";
import { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { createUsersAsync } from "../../redux/reducers/user/createUserAsync";
import Footer from "../Footer";
import FormBoxFlex from "../../custom-component/FormBoxFlex";
import { FormValues, defaultValues, formSchema } from "../../types/FormValues";
import { CreateNewUser } from "../../types/CreateNewUser";
import ButtonBoxFlex from "../../custom-component/ButtonBoxFlex";
import { AxiosError } from "axios";

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit: SubmitHandler<FormValues> = async (data) => {
    const user: CreateNewUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar:
        data.avatar ?? "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    const result = await dispatch(createUsersAsync(user));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(`Welcome ${user.name}`);
      setTimeout(() => {
        userSignIn();
      }, 1000);
    } else if (result.meta.requestStatus === "rejected") {
      if (result?.payload instanceof AxiosError) {
        if (result.payload?.response) {
          toast.error(`Opps! User registration has failed because ${result.payload?.response?.data as string}`);
        }
        else {
          toast.error(`Opps! User registration has failed because ${result.payload?.message}`);
        }
      }
    }
  };
  const userSignIn = () => {
    navigate("../login", { replace: true });
  };

  return (
    <Fragment>
      <Container maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
        <FormBoxFlex>
          <Avatar sx={{ bgcolor: purple[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Register</Typography>
          <Typography variant="h6">Please enter user detail</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter your name"
                  {...field}
                />
              )}
              name="name"
              control={control}
            />
            {errors.name && (
              <Typography color="red">{errors.name.message}</Typography>
            )}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter your email"
                  {...field}
                />
              )}
              name="email"
              control={control}
            />
            {errors.email && (
              <Typography color="red">{errors.email.message}</Typography>
            )}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
              name="password"
              control={control}
            />
            {errors.password && (
              <Typography color="red">{errors.password.message}</Typography>
            )}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Confirm your password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
              name="confirm"
              control={control}
            />
            {errors.confirm && (
              <Typography color="red">{errors.confirm.message}</Typography>
            )}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter Image Url"
                  {...field}
                />
              )}
              name="avatar"
              control={control}
            />
            {errors.avatar && (
              <Typography color="red">{errors.avatar.message}</Typography>
            )}

            <ButtonBoxFlex>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  reset(defaultValues);
                }}
              >
                Reset
              </Button>
              <Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
                Register
              </Button>
            </ButtonBoxFlex>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Already have an account ?</Typography>
              <Link component="button" variant="body2" onClick={userSignIn}>
                SignIn
              </Link>
            </Grid>
          </Box>
        </FormBoxFlex>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default UserRegister;
