import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/reducers/cart/cartReducer";
import { useNavigate } from "react-router-dom";

interface State extends SnackbarOrigin {
  open: boolean;
}

export const CheckOut = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    if (!user) {
      navigate("../login", { replace: true });
    } else {
      setState({ ...newState, open: true });
      dispatch(clearCart());
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Dear customer, we are pleased to inform you that your order has been placed and will arrive at its destination soon."
        autoHideDuration={5000}
        key={vertical + horizontal}
      />
    </Box>
  );
};
