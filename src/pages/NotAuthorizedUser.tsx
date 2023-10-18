import { Link as RouterLink } from "react-router-dom";
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { Fragment } from "react";

export const NotAuthorized = () => {
  return (
    <Fragment>
      <Container maxWidth="xs">
        <CssBaseline />
        <Typography>Access denied.</Typography>
        <Typography>User does not have access right</Typography>
        <Button component={RouterLink} to="/login">
          Log in
        </Button>
      </Container>
    </Fragment>
  );
};
