import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { OrderProductReadDTO } from "../types/orderDto";
import { useAppSelector } from "../app/hooks/useAppSelector";

export const OrderMessage = () => {
    const { orders, error, loading, order } = useAppSelector((state) => state.orderReducer)
    const calculateTotal = (items: OrderProductReadDTO[]) =>
        items.reduce((acc, item) => acc + item?.quntity * item?.price, 0);
    const today = new Date();

    // Add 7 days to the current date
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                {`Dear customer, your order has been placed on ${today.toLocaleDateString()} and will be delivered on ${nextWeek.toLocaleDateString()}.`}
            </Typography>
            <Paper elevation={3} style={{ marginTop: "20px" }}>
                <TableContainer>
                    <Table aria-label="Order table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order &&
                                order.orderProducts?.map((o) => (
                                    <TableRow key={order?.id}>
                                        <TableCell>{o?.product?.title}</TableCell>
                                        <TableCell>{o?.quntity}</TableCell>
                                        <TableCell>{`${Math.round((o?.quntity * o?.price) * 100) / 100}€`}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {order && (
                <Box
                    sx={{
                        display: "flex",
                        marginLeft: "auto",
                        marginTop: "2em",
                        marginBottom: "2em",
                    }}
                >
                    <Typography variant="h4">
                        Total: {calculateTotal(order.orderProducts)} €
                    </Typography>
                </Box>
            )}

        </Container>
    )

};
