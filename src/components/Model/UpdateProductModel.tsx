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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { updateProductAsync } from "../../redux/products/productReducer";
import UpdateProduct, { ProductDto } from "../../types/UpdateProduct";
import Product from "../../types/Product";

export default function UpdateProductModel({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(product.title);
  const [desc, setDesc] = React.useState(product.description);
  const [price, setPrice] = React.useState(product.price);
  const [categoryId, setCategoryId] = React.useState(product.category.id);
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

  const categoryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setCategoryId(+id);
  };

  const saveChanges = async () => {
    const productDto: ProductDto = {
      title: title,
      description: desc,
      price: price,
      categoryId: categoryId,
    };
    const updatedProduct: UpdateProduct = {
      id: product.id,
      updateProduct: productDto,
    };

    const result = await dispatch(updateProductAsync(updatedProduct));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(`${product.title} has been updated successfully`);
    } else if (result.meta.requestStatus === "rejected") {
      toast.error(`${product.title} could not updated`);
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
            display="flex"
            flexDirection="column"
            padding="2em"
          >
            <DialogTitle>Update the Product</DialogTitle>
            <TextField
              required
              id="title"
              label="Title"
              defaultValue={product.title}
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              id="desc"
              label="Description"
              multiline
              maxRows={4}
              variant="filled"
              defaultValue={product.description}
              onChange={(e) => setDesc(e.target.value)}
              sx={{ marginTop: "20px" }}
            />
            <TextField
              id="select-category"
              select
              variant="filled"
              defaultValue={product.category.name}
              value={categoryId}
              onChange={categoryHandleChange}
              sx={{ marginTop: "20px" }}
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              defaultValue={`${product.price}`}
              onChange={(e) => setPrice(+e.target.value)}
              sx={{ marginTop: "20px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
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
}
