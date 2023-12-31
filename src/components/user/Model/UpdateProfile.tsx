import {
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Controller,
  DefaultValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

import { User } from "../../../types/User";
import { UpdateUser, UpdateUserDto } from "../../../types/UpdateUser";
import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import { updateUserAsync } from "../../../redux/reducers/user/updateUserAsync";
import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { resetUser } from "../../../redux/reducers/user/userReducer";
import { updateUserProfileAsync } from "../../../redux/reducers/userAuthentication/updateUserProfileAsync";

export const UpdateProfileModel = ({ updateUser }: { updateUser: User }) => {
  const [open, setOpen] = useState(false);

  const defaultValues: DefaultValues<FormValues> = {
    name: updateUser.name,
    email: updateUser.email,
    avatar: updateUser.avatar,
    role: updateUser.role,
  };

  const formSchema = yup.object({
    name: yup.string().max(30).required("Required"),
    email: yup
      .string()
      .email("Email is not correct")
      .max(255)
      .required("Required"),
    avatar: yup.string().nullable(),
    role: yup.string().required(),
  });

  const dispatch = useAppDispatch();
  const { singleUser, error } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const updateUserDto: UpdateUserDto = {
      name: data.name,
      email: data.email,
      role: updateUser.role,
      avatar:
        data.avatar ?? "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };

    const user: UpdateUser = {
      id: updateUser.id,
      updateUser: updateUserDto,
    };
    const result = await dispatch(updateUserProfileAsync(user));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User details are updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Can't update the user", {
        position: toast.POSITION.TOP_RIGHT,
      });
      reset(defaultValues);
    }
    setOpen(false);
    dispatch(resetUser());
  };
  return (
    <Fragment>
      <ToastContainer />
      <Container maxWidth="xs">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleClickOpen}
          size="large"
        >
          Edit
        </Button>
        <CssBaseline />
        <Dialog open={open} fullWidth>
          {updateUser && (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {updateUser.name}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            sx={{ mt: 1 }}
          >
            <DialogTitle>Edit Profile</DialogTitle>
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
            {/* <Controller
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
            )} */}

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
            <DialogActions
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "10px",
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  endIcon={<CancelIcon />}
                  onClick={handleClose}
                  color="error"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px" }}
                  onClick={() => {
                    reset(defaultValues);
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px" }}
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    </Fragment>
  );
};
interface FormValues {
  name: string;
  email: string;
  avatar?: string | undefined | null;
  role: string;
}
