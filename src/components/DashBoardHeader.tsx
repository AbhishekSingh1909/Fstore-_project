import { Box, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect } from "react";
import { NotAuthorized } from "../pages/NotAuthorizedUser";

export const HeaderDashBoard = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user && user.role !== "admin")) {
      navigate("../NotAuthorized", { replace: true });
    }
  }, [user]);
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
        <Button component={Link} to="../users" size="large">
          Users
        </Button>
      </Box>
    </Container>
  );
};
