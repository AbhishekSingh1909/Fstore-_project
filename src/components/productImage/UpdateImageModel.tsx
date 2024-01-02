import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
    Box,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import Images from "../../types/Images";
import { CreateProductImage, UpdateProductImageDto } from "../../types/CreateProductImage";
import { updateProductImagesAsync } from "../../redux/reducers/image/updateProductImageAsync";

export default function UpdateImageModel({ images }: { images: Images }) {
    const [open, setOpen] = React.useState(false);
    console.log(images?.imageUrl);
    const dispatch = useAppDispatch();


    const defaultValues: DefaultValues<FormValues> = {
        imageUrl: ""
    };
    const formSchema = yup.object({
        imageUrl: yup.string().url('Must be a valid image url').required("Required"),
    });

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
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(formSchema),
    });

    const onFormSubmit: SubmitHandler<FormValues> = async (data, event) => {
        event?.preventDefault();

        const imageUrl: CreateProductImage = {
            imageUrl: data?.imageUrl
        };
        const updateImage: UpdateProductImageDto = {
            imageUrl: imageUrl,
            id: images?.id
        }
        const result = await dispatch(updateProductImagesAsync(updateImage));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success(`Image is updated successfully`);
        } else if (result.meta.requestStatus === "rejected") {
            toast.error(`Image could not updated`);
            reset(defaultValues);
        }
        setOpen(false);
    };

    return (
        <main>
            <Box>
                <ToastContainer />
                <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={handleClickOpen}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Dialog open={open} fullWidth>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onFormSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <DialogTitle>Update Image</DialogTitle>
                        <TextField
                            required
                            fullWidth
                            id="imageUrl"
                            margin="normal"
                            label="imageUrl"
                            defaultValue={images?.imageUrl}
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
                            <Button variant="contained" type="submit" endIcon={<SendIcon />}>
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