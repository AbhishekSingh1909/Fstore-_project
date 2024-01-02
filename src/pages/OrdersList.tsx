import {
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputBase,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import ErrorMessage from "../components/ErrorMessage";
import { authenticateUserAsync } from "../redux/reducers/userAuthentication/authenticateUserAsync";
import { NotAuthorized } from "./NotAuthorizedUser";
import Login from "./Login";
import { Order } from "../types/orderDto";
import { getAllOrdersAsync } from "../redux/reducers/order/getAllOrdersAsync";
import getFilteredOrders from "../selectors/getFilteredOrders";

const OrdersList = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<Order[]>([]);
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebouncedSearch] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const access_token = localStorage.getItem("access_token");

    const { orders, error, loading } = useAppSelector(
        (state) => state.orderReducer
    );
    const { user } = useAppSelector((state) => state.authReducer);
    useEffect(() => {

        if (access_token !== null) {
            dispatch(authenticateUserAsync(access_token));
            dispatch(getAllOrdersAsync());
        }
    }, [access_token]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDebouncedSearch(search);
        }, 100);

        return () => clearTimeout(timeOutId);
    }, [search]);
    const handleSeachChange = (search: string) => {
        setSearch(search);
    };

    const { pageCount, filterOrders } = useMemo(() => {
        const filterOrders = getFilteredOrders(orders, debounceSearch);
        const pageCount = Math.ceil(filterOrders.length / 20);
        const data = filterOrders?.slice(0, 10);
        setData(data);
        return { pageCount, filterOrders };
    }, [orders, debounceSearch]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);

        // show the count at per page
        // 0 - 10
        // 11 - 20
        const startIndex = (value - 1) * 10;

        const data = filterOrders?.slice(startIndex, value * 10);
        setData(data);
    };

    if (!user) {
        return <Login />;
    }

    if (user && user.role !== "Admin") {
        return <NotAuthorized />;
    }

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
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "2em",
                }}
            >
            </Box>
            <Container maxWidth="xs" sx={{ marginTop: "20px" }}>
                <Paper
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 400,
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Order"
                        onChange={(e) => handleSeachChange(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>
            <Typography variant="h4" gutterBottom>
                Order List
            </Typography>
            <Paper elevation={3} style={{ marginTop: "20px" }}>
                <TableContainer>
                    <Table aria-label="Order table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order No.</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data.map((o) => (
                                    <TableRow key={o.id}>
                                        <TableCell>{o?.id}</TableCell>
                                        <TableCell>{o?.status}</TableCell>
                                        <TableCell>{o?.user?.name}</TableCell>
                                        <TableCell>
                                            {user?.role === "Admin" && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <Stack spacing={1}>
                                                        <Button> View </Button>
                                                    </Stack>

                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {data && (
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
                        sx={{ margin: "20px", padding: "20px" }}
                    />
                </Stack>
            )}
        </Container>
    );
};

export default OrdersList;