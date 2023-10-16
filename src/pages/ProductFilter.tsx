import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getProductCategoriesAsync } from "../redux/reducers/category/getProductCategoriesAsync";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import ProductsPage from "./PorductsList";
import { CreateProductModel } from "../components/Model/CreateProductModel";
import ErrorMessage from "../components/ErrorMessage";

const ProductCategory = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [priceSort, setPricePriceSort] = useState("");

  useEffect(() => {
    dispatch(getProductCategoriesAsync());
  }, []);

  const { categories, error, loading } = useAppSelector(
    (state) => state.ProductCategoryReducer
  );

  const filterHandleChange = (event: SelectChangeEvent) => {
    const id = event.target.value;
    setCategoryId(+id);
  };

  const priceHandleChange = (event: SelectChangeEvent) => {
    setPricePriceSort(event.target.value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <CircularProgress size={64} color="secondary" />
      </Box>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main>
      <Box>
        {categories && (
          <Box
            sx={{
              display: "flex",
              width: "50%",
              gap: "10px",
              marginLeft: "auto",
              marginTop: "2em",
            }}
          >
            {user?.role === "admin" && (
              <Box sx={{ width: "60%" }}>
                <CreateProductModel />
              </Box>
            )}

            <FormControl fullWidth>
              <InputLabel id="demo-select-price-sorting-standard-label">
                By Price
              </InputLabel>
              <Select
                labelId="select-price-sorting"
                id="demo-select-price-sorting"
                value={priceSort}
                label="Price"
                onChange={priceHandleChange}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId === 0 ? "" : categoryId.toString()}
                label="Categories"
                onChange={filterHandleChange}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories?.map((c) => (
                  <MenuItem value={c.id} key={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      <ProductsPage categoryId={categoryId} sortPrice={priceSort} />
    </main>
  );
};

export default ProductCategory;
