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
import React, { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import Product from "../../../types/Product";
import { deleteProductAsync } from "../../../redux/reducers/product/deleteProductAsync";
import { useAppSelector } from "../../../app/hooks/useAppSelector";

export const DeleteProductModel = ({ product }: { product: Product }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.ProductCategoryReducer.categories
  );

  const category_name = useMemo(() => {
    const result = categories?.find(c => c.id == product?.categoryId);
    return result
  }, [product])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletedProduct = async () => {
    if (product) {
      const result = await dispatch(deleteProductAsync(product.id));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`${product.title} has been deleted successfully`);
      } else if (result.meta.requestStatus === "rejected") {
        toast.error(`${product.title} could not deleted`);
      }
    }
    setOpen(false);
  };

  return (
    <main>
      <Box>
        <ToastContainer />
        <Tooltip title="Delete">
          <IconButton color="error" size="large" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Dialog open={open} fullWidth>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            padding="2em"
          >
            <DialogTitle>Do you want to delete the product?</DialogTitle>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              value={product?.title}
            />

            <TextField
              id="desc"
              label="Description"
              multiline
              maxRows={4}
              variant="filled"
              value={product?.description}
              sx={{ marginTop: "20px" }}
            />
            <TextField
              id="select-category"
              label="Category"
              variant="filled"
              value={category_name?.name}
              sx={{ marginTop: "20px" }}
            ></TextField>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              sx={{ marginTop: "20px" }}
              value={product?.price}
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
