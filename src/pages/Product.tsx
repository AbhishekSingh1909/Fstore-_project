import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

import Product from "../types/Product";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { addToCart } from "../redux/reducers/cart/cartReducer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProductByIdAsync } from "../redux/reducers/product/getSingleProductByIdAsync";
import { useAppSelector } from "../app/hooks/useAppSelector";

const FetchSingleProduct = () => {
  const { products, error, loading, product } = useAppSelector(
    (state) => state.productReducer
  );

  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      dispatch(getSingleProductByIdAsync(Number(id)));
    }
  }, [id]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <Grid container spacing={6}>
      <CssBaseline />
      <Grid item xs={5}>
        <Carousel>
          {product?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} Image ${index + 1}`}
              style={{ width: "60%", height: "60%", margin: "20px" }}
            />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={6}>
        {products &&
          products.map((product) => (
            <Card sx={{ maxWidth: 345, margin: "20px" }}>
              <CardContent>
                {product && (
                  <Typography gutterBottom variant="h5" component="div">
                    Title : {product.title}
                  </Typography>
                )}

                {product && (
                  <Typography variant="h6" color="text.secondary">
                    Discription : {product.description}
                  </Typography>
                )}

                {product && (
                  <Typography variant="h6" color="text.secondary">
                    Category : {product.category.name}
                  </Typography>
                )}

                {product && (
                  <Typography variant="h6" color="text.secondary">
                    Price : {product.price}€
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={2}>
                  <Button onClick={(e) => handleAddToCart(product)}>
                    Add To Cart
                  </Button>
                  <Button component={Link} to="/products">
                    Back
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          ))}
      </Grid>
    </Grid>
  );
};

export default FetchSingleProduct;
