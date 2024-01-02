import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import React from "react";
import { CreateOrder, OrderProductCreateDTO } from "../types/orderDto";
import { clearCart } from "../redux/reducers/cart/cartReducer";
import { createOrderAsync } from "../redux/reducers/order/createOrderAsync";
import { Box, CircularProgress, Container, CssBaseline, Paper, Typography } from "@mui/material";
import ErrorMessage from "../components/ErrorMessage";

const OrderCreatePage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authReducer);
    const { error, loading, order } = useAppSelector((state) => state.orderReducer)
    const { cartItems } = useAppSelector((state) => state.cartReducer);
    const today = new Date();
    React.useEffect(() => {
        if (cartItems && cartItems?.length > 0) {

            const orders_Products = cartItems?.map((m) => {
                const orderPrducts: OrderProductCreateDTO = {
                    productId: m.id,
                    quntity: m.quantity
                };
                return orderPrducts;
            })
            const createOrder: CreateOrder = {
                orderProducts: orders_Products
            }
            dispatch(createOrderAsync(createOrder));
            dispatch(clearCart());
        }
    }, [])
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
        <React.Fragment>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            {`Your order number is ${order?.id} created on ${today.toDateString()}. We have emailed your order
                              confirmation at ${user?.email}, and will send you an update when your order has shipped.`}
                        </Typography>
                    </React.Fragment>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default OrderCreatePage;