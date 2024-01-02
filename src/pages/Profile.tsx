import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppSelector } from "../app/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { UpdateProfileModel } from "../components/user/Model/UpdateProfile";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { deleteUserProfileAsync } from "../redux/reducers/userAuthentication/deleteUserProfileAsync";
import { toast } from "react-toastify";
import { clearCart } from "../redux/reducers/cart/cartReducer";
import { UpdatePasswordModel } from "../components/user/Model/UpdatePassword";

export const Profile = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { users, singleUser } = useAppSelector((state) => state.userReducer);

  const handledeleteUser = async () => {
    const result = await dispatch(deleteUserProfileAsync());
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User is unregister successfully");
      dispatch(clearCart());
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while unregister the User");
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("../login", { replace: true });
    }
  }, [user]);



  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Card sx={{ maxWidth: 345, margin: "20px" }}>
        <CardMedia
          component="img"
          alt={user?.name}
          height="194"
          image={user?.avatar}
        />
        <CardContent>
          {user && (
            <Typography gutterBottom variant="h5" component="div">
              Name : {user.name}
            </Typography>
          )}

          {user && (
            <Typography variant="h6" color="text.secondary">
              Email : {user.email}
            </Typography>
          )}
          {user && (
            <Typography variant="h6" color="text.secondary">
              Role : {user.role}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              size="large"
              onClick={handledeleteUser}
            >
              Delete
            </Button>
            {user && <UpdateProfileModel updateUser={user} />}
          </Stack>

        </CardActions>
      </Card>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "20%",
        marginBottom: "10%"
      }}>
        <UpdatePasswordModel />
      </Box>
    </Container>
  );
};
