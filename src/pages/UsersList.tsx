import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { getAllUsersAsync } from "../redux/users/getAllUsersAsync";
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
                  alignItems: "center",
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

                      gap: "20px",
                      margin: "20px",
                      marginBottom: "0px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon color="error" />}
                    >
                      Delete
                    </Button>
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
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        )}
      </Container>
    </main>
  );
};
