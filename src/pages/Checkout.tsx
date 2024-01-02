import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddressForm from "./AddressForm";
import Review from "./Review";
import { useAppSelector } from '../app/hooks/useAppSelector';
import { useAppDispatch } from '../app/hooks/useAppDispatch';
import { CircularProgress } from '@mui/material';
import ErrorMessage from '../components/ErrorMessage';
import { createOrderAsync } from '../redux/reducers/order/createOrderAsync';
import { CreateOrder, OrderProductCreateDTO } from '../types/orderDto';
import { clearCart } from '../redux/reducers/cart/cartReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NotAuthorized } from './NotAuthorizedUser';
import Login from './Login';

const steps = ['Shipping address', 'Review your order'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export const CheckoutPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error, loading, order } = useAppSelector((state) => state.orderReducer)
    const { cartItems } = useAppSelector((state) => state.cartReducer);
    const { user } = useAppSelector((state) => state.authReducer)
    const { address } = useAppSelector(
        (state) => state.addressReducer
    );
    console.log("user has value", user);
    const today = new Date();
    const handleNext = () => {

        setActiveStep(activeStep + 1);
        if ((activeStep === steps.length - 1) && (cartItems && cartItems.length > 0)) {
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
    };

    const handleBack = () => {

        setActiveStep(activeStep - 1);
    };
    if (!user) {

        navigate("../login", { replace: true });
    }
    if (user && user && user.role !== "Customer") {
        return <NotAuthorized />;
    }
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
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is "#{order?.id}" created on  "{today.toDateString()}". We have emailed your order
                                confirmation at "{user?.email}", and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                {user && (user?.address || address) && (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                )}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}