import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    InputAdornment,
    TextField,
    IconButton,
    Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import { User } from "../../../types/User";
import { deleteUserAsync } from "../../../redux/reducers/user/deleteUserAsync";

const DeleteUserByAdmin = ({ deleteUser }: { deleteUser: User }) => {
    const [open, setOpen] = React.useState(false);
    const [reloadFlag, setReloadFlag] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletedProduct = async () => {
        if (deleteUser) {
            const result = await dispatch(deleteUserAsync(deleteUser.id));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("User deleted successfully");
                setReloadFlag(true);
            } else if (result.meta.requestStatus === "rejected") {
                toast.error("Error while deleting User");
            }
        }
        setOpen(false);
    };

    return (
        <main>
            <Box>
                <ToastContainer />
                <Button
                    variant="contained"
                    endIcon={<DeleteIcon />}
                    onClick={handleClickOpen}
                    color="error"
                >
                    Delete
                </Button>

                <Dialog open={open} fullWidth>
                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        padding="2em"
                    >
                        <DialogTitle>Do you want to delete the User </DialogTitle>
                        <TextField
                            id="name"
                            label="Name"
                            variant="filled"
                            value={deleteUser.name}
                        />

                        <TextField
                            id="email"
                            label="Email"
                            multiline
                            maxRows={4}
                            variant="filled"
                            value={deleteUser.email}
                            sx={{ marginTop: "20px" }}
                        />

                        <TextField
                            id="role"
                            label="Role"
                            variant="filled"
                            sx={{ marginTop: "20px" }}
                            value={deleteUser.role}
                        />
                    </Box>
                    <DialogActions>
                        <Button
                            variant="contained"
                            endIcon={<CancelIcon />}
                            onClick={handleClose}
                            color="error"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={deletedProduct}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </main>
    );
};
export default DeleteUserByAdmin;
