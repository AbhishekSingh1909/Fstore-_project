import { Box, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect } from "react";
import { NotAuthorized } from "../pages/NotAuthorizedUser";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { authenticateUserAsync } from "../redux/reducers/userAuthentication/authenticateUserAsync";
import Login from "../pages/Login";

export const HeaderDashBoard = () => {
  const access_token = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token !== null) {
      dispatch(authenticateUserAsync(access_token));
    }
  }, [access_token]);

  if (user && user && user.role !== "Admin") {
    return <NotAuthorized />;
  }
  if (!user) {
    return <Login />;
  }
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          margin: "20px",
        }}
      >
        <Button component={Link} to="" size="large">
          Products
        </Button>
        <Button component={Link} to="./users" size="large">
          Users
        </Button>
      </Box>
    </Container>
  );
};
