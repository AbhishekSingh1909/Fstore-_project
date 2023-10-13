import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  message?: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <Container component={Paper}>
      <Typography gutterBottom variant="h4">
        Error Details :{message}
      </Typography>
      <Button component={Link} to="/" fullWidth>
        Go back to Homepage
      </Button>
    </Container>
  );
}
