import { useState } from "react";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import Product from "../../types/Product";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { CreateProductImageDto } from "../../types/CreateProductImage";
import { createProductImageAsync } from "../../redux/reducers/image/createProductImageAsync";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, TextField, Tooltip, Typography } from "@mui/material";

export const CreateImageModel = ({ id }: { id: string }) => {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const defaultValues: DefaultValues<FormValues> = {
        imageUrl: ""
    };
    const formSchema = yup.object({
        imageUrl: yup.string().url('Must be a valid image url').required("Required"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(formSchema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onFormSubmit: SubmitHandler<FormValues> = async (data, event) => {
        event?.preventDefault();
        const createImage: CreateProductImageDto = {
            imageUrl: data.imageUrl,
            productId: id
        }


        const result = await dispatch(createProductImageAsync(createImage));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success(`Image has been created successfully`);
        } else if (result.meta.requestStatus === "rejected") {
            toast.error(`Image could not created`);
        }
        reset(defaultValues);
        setOpen(false);
    };

    return (
        <main>
            <ToastContainer />
            <Box sx={{ marginTop: "5px" }}>

                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Add Image
                </Button>
                <Dialog open={open} fullWidth>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onFormSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <DialogTitle>Add Image</DialogTitle>
                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            id="image"
                            label="Enter Image Url"
                            variant="filled"
                            {...register("imageUrl")}
                        />
                        {errors.imageUrl && (
                            <Typography color="red">{errors.imageUrl.message}</Typography>
                        )}
                        <DialogActions>
                            <Button
                                variant="contained"
                                endIcon={<CancelIcon />}
                                onClick={handleClose}
                                color="error"
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                Save
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Box>
        </main>
    );

}

interface FormValues {
    imageUrl: string;
}