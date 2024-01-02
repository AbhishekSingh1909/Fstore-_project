import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { CreateOrder, OrderProductCreateDTO } from "../types/orderDto";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
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

    </Box>
  );
};
