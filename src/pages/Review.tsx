import React from "react";
import { useAppSelector } from "../app/hooks/useAppSelector"
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { CartItem } from "../types/CartItem";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { getAddressAsync } from "../redux/reducers/address/getAddressAsync";
import { useNavigate } from "react-router-dom";
import { NotAuthorized } from "./NotAuthorizedUser";

export default function Review() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { address } = useAppSelector(
        (state) => state.addressReducer
    );
    const { user } = useAppSelector((state) => state.authReducer)
    const { orders, error, loading, order } = useAppSelector((state) => state.orderReducer)
    const { cartItems } = useAppSelector((state) => state.cartReducer);
    // const calculateTotal = (items: OrderProductReadDTO[]) =>
    //     items.reduce((acc, item) => acc + item?.quntity * item?.price, 0);
    const calculateTotal = (items: CartItem[]) =>
        items.reduce((acc, item) => Math.round((acc + item.quantity * item.price) * 100) / 100, 0);
    const today = new Date();

    // Add 7 days to the current date
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    React.useEffect(() => {
        debugger;
        dispatch(getAddressAsync());
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cartItems && cartItems?.map((product) => (
                    <ListItem key={product?.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product?.title} />
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "20",
                            width: "20%"

                        }}>
                            <Typography variant="caption">{`${product?.quantity}`}</Typography>
                            <Typography variant="body2">{`${Math.round((product?.quantity * product?.price) * 100) / 100}€`}</Typography>
                        </Box>
                    </ListItem>
                ))}
                {cartItems && (
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {calculateTotal(cartItems)} €
                        </Typography>
                    </ListItem>
                )}
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{`${address?.houseNumber},${address?.street},${address?.city},${address?.postCode},${address?.country}`}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}