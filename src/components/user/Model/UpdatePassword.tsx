import { Fragment, useState } from "react";
import { Controller, DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import { UpdateUserPassword } from "../../../types/UpdateUser";
import { updatePasswordAsync } from "../../../redux/reducers/userAuthentication/updatePasswordAsync";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogTitle, TextField, Typography } from "@mui/material";

export const UpdatePasswordModel = () => {
    const [open, setOpen] = useState(false);
    const defaultValues: DefaultValues<FormValues> = {
        password: '',
        p_confirm: '',
    };

    const formSchema = yup.object({
        password: yup.string().max(10).required("Required"),
        p_confirm: yup.string().required("Required")
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
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
        const updatePassword: UpdateUserPassword = {
            Password: data.password
        };

        const result = await dispatch(updatePasswordAsync(updatePassword));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("User password is updated successfully", {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else if (result.meta.requestStatus === "rejected") {
            toast.error("Can't update the user password", {
                position: toast.POSITION.TOP_RIGHT,
            });
            reset(defaultValues);
        }
        setOpen(false);
    };
    return (
        <Fragment>
            <ToastContainer />
            <Container maxWidth="xs">
                <Button
                    variant="text"
                    onClick={handleClickOpen}
                    size="medium"
                >
                    Change Password
                </Button>
                <CssBaseline />
                <Dialog open={open} fullWidth>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onFormSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <DialogTitle>Update Password</DialogTitle>
                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            {...register("password")}
                        />
                        {errors.password && (
                            <Typography color="red">{errors.password.message}</Typography>
                        )}

                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            id="standard-password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            {...register("p_confirm")}
                        />
                        {errors.p_confirm && (
                            <Typography color="red">{errors.p_confirm.message}</Typography>
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
    )

}

interface FormValues {
    password: string;
    p_confirm: string
}

