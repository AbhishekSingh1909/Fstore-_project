import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { createProductAsync } from "../../../redux/reducers/product/createProductAsync";
import { CreateProduct, CreateProductWithAccessToken } from "../../../types/CreateProduct";

import {
  FormValues,
  defaultValues,
  formSchema,
} from "../../../types/FormValidation/ProductFormValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProductImage } from "../../../types/CreateProductImage";

export const CreateProductModel = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.ProductCategoryReducer.categories
  );

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
    const createImages: CreateProductImage = {
      imageUrl: data.images || "https://i.imgur.com/kTPCFG2.jpeg"
    };
    const product: CreateProduct = {
      title: data.title,
      description: data.description,
      price: data.price,
      inventory: data.inventory,
      categoryId: data.categoryId,
      images: [createImages],
    };

    const product_accessToken: CreateProductWithAccessToken = {
      createProduct: product,
      access_token: localStorage.getItem("access_token")
    };
    const result = await dispatch(createProductAsync(product_accessToken));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(`product ${product.title} has been created successfully`);
    } else if (result.meta.requestStatus === "rejected") {
      toast.error(`product ${product.title} could not created`);
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
          Add Product
        </Button>
        <Dialog open={open} fullWidth>
          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            sx={{ mt: 1 }}
          >
            <DialogTitle>Create New Product</DialogTitle>

            <TextField
              required
              fullWidth
              id="title"
              margin="normal"
              label="Enter Product Title"
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
              label="Product Description"
              multiline
              maxRows={4}
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
              defaultValue={1}
              {...register("categoryId")}
            >
              {categories?.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
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
              label="Stock"
              id="inventory"
              {...register("inventory")}
            />
            {errors.inventory && (
              <Typography color="red">{errors.inventory.message}</Typography>
            )}
            <TextField
              required
              fullWidth
              margin="normal"
              id="image"
              label="Enter Image Url"
              variant="filled"
              {...register("images")}
            />

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
};
