import {
  Avatar,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
  IconButton,
  InputBase,
  Paper,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import {
  getAllProductsAsync,
  sortByPrice,
} from "../redux/reducers/product/productReducer";
import { getProductsByCategoryAsync } from "../redux/reducers/product/getProductsByCategoryAsync";
import { addToCart } from "../redux/reducers/cart/cartReducer";
import Product from "../types/Product";
import getFilteredProducts from "../selectors/getFilteredProducts";
import UpdateProductModel from "../components/Model/UpdateProductModel";
import { DeleteProductModel } from "../components/Model/DeleteProductModel";
import ErrorMessage from "../components/ErrorMessage";

interface ProductProps {
  categoryId: number | undefined;
  sortPrice: string;
}

const ProductsPage = ({ categoryId, sortPrice }: ProductProps) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebouncedSearch] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const { products, error, loading } = useAppSelector(
    (state) => state.productReducer
  );
  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategoryAsync(categoryId));
    } else {
      dispatch(getAllProductsAsync());
    }
  }, [categoryId]);

  useEffect(() => {
    dispatch(sortByPrice(sortPrice === "asc" ? "asc" : "desc"));
  }, [sortPrice]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100);

    return () => clearTimeout(timeOutId);
  }, [search]);

  const { pageCount, filterProducts } = useMemo(() => {
    const filterProducts = getFilteredProducts(products, debounceSearch);
    const pageCount = Math.ceil(filterProducts.length / 10);
    const data = filterProducts?.slice(0, 10);
    setData(data);
    return { pageCount, filterProducts };
  }, [products, debounceSearch]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    // show the count at per page
    // 0 - 10
    // 11 - 20
    const startIndex = (value - 1) * 10;

    const data = filterProducts?.slice(startIndex, value * 10);
    setData(data);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleSeachChange = (search: string) => {
    setSearch(search);
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
      <Container>
        <Container maxWidth="xs" sx={{ marginTop: "20px" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Prodcut by title"
              onChange={(e) => handleSeachChange(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Container>
        <Typography variant="h3">Products</Typography>;
        {data && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              borderColor: "red",
              borderRadius: "20px",
            }}
          >
            {data?.map((p) => (
              <Card sx={{ Width: "80%", margin: "20px" }} key={p.id}>
                <CardMedia
                  component="img"
                  alt={p?.title}
                  height="194"
                  image={p?.images[0]}
                />
                <CardContent>
                  {p && (
                    <Typography gutterBottom variant="h6" component="div">
                      Title : {p.title}
                    </Typography>
                  )}
                  {p && (
                    <Typography color="text.secondary">
                      Category : {p.category.name}
                    </Typography>
                  )}

                  {p && (
                    <Typography color="text.secondary">
                      Price : {p.price}€
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleAddToCart(p)}>
                      Add To Cart
                    </Button>
                    <Button component={Link} to={`/product/${p.id}`}>
                      View
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
        {data && (
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Page: {page}</Typography>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              color="primary"
              sx={{ margin: "20px", padding: "20px" }}
            />
          </Stack>
        )}
      </Container>
    </main>
  );
};

export default ProductsPage;
