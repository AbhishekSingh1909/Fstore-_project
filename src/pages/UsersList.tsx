import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { getAllUsersAsync } from "../redux/reducers/user/getAllUsersAsync";
import UpdateUserByAdmin from "../components/user/Model/UpdateUser";
import { User } from "../types/User";
import ErrorMessage from "../components/ErrorMessage";

export const UsersList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const { user } = useAppSelector((state) => state.authReducer);
  const { users, error, loading } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        dispatch(getAllUsersAsync());
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user]);
  const pageCount = useMemo(() => {
    const pageCount = Math.ceil(users.length / 10);
    const data = users?.slice(0, 10);
    setData(data);
    return pageCount;
  }, [users]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    // show the count at per page
    // 0 - 10
    // 11 - 20
    const startIndex = (value - 1) * 10;

    const data = users?.slice(startIndex, value * 10);
    setData(data);
  };
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
    <main>
      <Container>
        <Box
          sx={{
            display: "flex",
            margin: "1em",
            marginRight: "auto",
          }}
        >
          <Button variant="contained" onClick={handleNavigateBack}>
            Back
          </Button>
        </Box>
        <Typography variant="h4"> Users</Typography>

        {data?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              borderColor: "red",
              borderRadius: "20px",
            }}
          >
            {data?.map((user) => (
              <Box
                key={user.id}
                sx={{
                  width: "30%",
                  hight: "10%",
                  padding: "1em",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#9575cd",
                    color: "rgb(255, 236, 179)",
                    borderRadius: "5px",
                  }}
                >
                  <Typography>Name: {user?.name}</Typography>
                  <Typography>Email: {user?.email}</Typography>
                  <Typography>Role: {user?.role}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <Container maxWidth="xs">
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Container>

                    <UpdateUserByAdmin updateUser={user} />
                  </Box>
                </CardContent>
              </Box>
            ))}
          </Box>
        )}
        {users && (
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Page: {page}</Typography>
            <Pagination
              count={pageCount}
              page={page}
              color="primary"
              sx={{ margin: "20px", padding: "20px" }}
              onChange={handleChange}
            />
          </Stack>
        )}
      </Container>
    </main>
  );
};
