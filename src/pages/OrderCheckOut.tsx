import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { clearCart } from "../redux/reducers/cart/cartReducer";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { CreateOrder, OrderProductCreateDTO } from "../types/orderDto";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useEffect } from "react";
import { createOrderAsync } from "../redux/reducers/order/createOrderAsync";
import { toast } from "react-toastify";
import { getAllOrdersAsync } from "../redux/reducers/order/getAllOrdersAsync";
import { resetOrder } from "../redux/reducers/order/orderReducer";

interface State extends SnackbarOrigin {
  open: boolean;
}

export const CheckOut = ({ cartItems }: { cartItems: CartItem[] }) => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { orders, error, loading, order } = useAppSelector((state) => state.orderReducer)
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vertical, horizontal, open } = state;

  const orders_Products = cartItems.map((m) => {
    const orderPrducts: OrderProductCreateDTO = {
      productId: m.id,
      quntity: m.quantity
    };
    return orderPrducts;
  })
  const createOrder: CreateOrder = {
    orderProducts: orders_Products
  }
  const handleClick = (newState: SnackbarOrigin) => async () => {
    if (!user) {
      navigate("../login", { replace: true });
    } else {
      if (cartItems !== null) {
        dispatch(resetOrder())
        navigate('/checkOutPage');
      }
    }
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button
        size="medium"
        variant="contained"
        onClick={handleClick({ vertical: "top", horizontal: "center" })}
      >
        CheckOut
      </Button>
    </React.Fragment>
  );

  return (
    <Box>
      {buttons}
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Dear customer, we are pleased to inform you that your order has been placed and will arrive at its destination soon."
        autoHideDuration={5000}
        key={vertical + horizontal}
      /> */}
    </Box>
  );
};
