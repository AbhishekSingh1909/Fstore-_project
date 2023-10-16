import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { createProductAsync } from "../../redux/reducers/product/createProductAsync";
import { CreateProduct } from "../../types/CreateProduct";

export const CreateProductModel = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [categoryId, setCategoryId] = React.useState<number>(1);
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState("");

  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.ProductCategoryReducer.categories
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveChanges = async () => {
    const product: CreateProduct = {
      title: title,
      description: desc,
      price: price,
      categoryId: categoryId,
      images: [image || "https://i.imgur.com/kTPCFG2.jpeg"],
    };
    const result = await dispatch(createProductAsync(product));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(`product ${product.title} has been created successfully`);
    } else if (result.meta.requestStatus === "rejected") {
      toast.error(`product ${product.title} could not created`);
    }
    setOpen(false);
  };
  const categoryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setCategoryId(+id);
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
            display="flex"
            flexDirection="column"
            padding="2em"
          >
            <DialogTitle>Create New Product</DialogTitle>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              id="desc"
              label="Description"
              multiline
              maxRows={4}
              variant="filled"
              onChange={(e) => setDesc(e.target.value)}
              sx={{ marginTop: "20px" }}
            />
            <TextField
              id="select-category"
              label="Category"
              select
              variant="filled"
              value={categoryId}
              onChange={categoryHandleChange}
              sx={{ marginTop: "20px" }}
            >
              {categories?.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              onChange={(e) => setPrice(+e.target.value)}
              sx={{ marginTop: "20px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
            <TextField
              id="image"
              label="Image Url"
              variant="filled"
              onChange={(e) => setImage(e.target.value)}
              sx={{ marginTop: "20px" }}
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
              endIcon={<SendIcon />}
              onClick={saveChanges}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </main>
  );
};
