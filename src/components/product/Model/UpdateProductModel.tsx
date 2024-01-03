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
  InputAdornment,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import { updateProductAsync } from "../../../redux/reducers/product/productReducer";
import UpdateProduct, { ProductDto } from "../../../types/UpdateProduct";
import Product from "../../../types/Product";
import {
  FormValues,
  formSchema,
} from "../../../types/FormValidation/ProductFormValues";

export default function UpdateProductModel({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state) => state.ProductCategoryReducer.categories
  );


  const defaultValues: DefaultValues<FormValues> = {
    title: product?.title,
    description: product?.description,
    price: product?.price,
    categoryId: product?.categoryId,
    images: product.images[0],
  };

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
    const productDto: ProductDto = {
      title: data.title,
      description: data.description,
      price: data.price,
      inventory: data.inventory,
      categoryId: data.categoryId,
    };
    const updatedProduct: UpdateProduct = {
      id: product?.id,
      updateProduct: productDto,
    };
    const result = await dispatch(updateProductAsync(updatedProduct));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(`${product.title} has been updated successfully`);
    } else if (result.meta.requestStatus === "rejected") {
      toast.error(`${product.title} could not updated`);
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
            <DialogTitle>Update the Product</DialogTitle>
            <TextField
              required
              fullWidth
              id="title"
              margin="normal"
              label="Title"
              defaultValue={product?.title}
              {...register("title")}
            />
            {errors.title && (
              <Typography color="red">{errors.title.message}</Typography>
            )}

            <TextField
              required
              fullWidth
              margin="normal"
              id="description"
              label="Description"
              multiline
              maxRows={4}
              variant="filled"
              defaultValue={product?.description}
              {...register("description")}
            />
            {errors.description && (
              <Typography color="red">{errors.description.message}</Typography>
            )}
            <TextField
              required
              fullWidth
              select
              id="categoryId"
              label="Category"
              defaultValue={product?.categoryId}
              {...register("categoryId")}
            >
              {categories?.map((c) => (
                <MenuItem key={c?.id} value={c?.id}>
                  {c?.name}
                </MenuItem>
              ))}
            </TextField>
            {errors.categoryId && (
              <Typography color="red">{errors.categoryId.message}</Typography>
            )}
            <TextField
              required
              fullWidth
              margin="normal"
              label=" Price"
              id="price"
              defaultValue={product?.price}
              {...register("price")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
            {errors.price && (
              <Typography color="red">{errors.price.message}</Typography>
            )}

            <TextField
              required
              fullWidth
              margin="normal"
              label=" inventory"
              id="inventory"
              defaultValue={product?.inventory}
              {...register("inventory")}
            />
            {errors.inventory && (
              <Typography color="red">{errors.inventory.message}</Typography>
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
