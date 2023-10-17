import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const HeaderDashBoard = () => {
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
