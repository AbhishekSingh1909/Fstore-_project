import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch"
import { useAppSelector } from "../app/hooks/useAppSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProductAllImagesAsync } from "../redux/reducers/image/getProductAllImagesAsync";
import { NotAuthorized } from "./NotAuthorizedUser";
import Login from "./Login";
import { Box, Button, CircularProgress, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductByIdAsync } from "../redux/reducers/product/getSingleProductByIdAsync";
import { ToastContainer, toast } from "react-toastify";
import { deleteProductImageAsync } from "../redux/reducers/image/deleteProductImageAsync";
import Images from "../types/Images";
import UpdateImageModel from "../components/productImage/UpdateImageModel";
import { CreateImageModel } from "../components/productImage/CreateproductImage";

const ProductImages = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const id = params?.id;
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.authReducer);
    const { images, error, loading } = useAppSelector((state) => state.imageReducer);
    const { product } = useAppSelector((state) => state.productReducer);

    useEffect(() => {
        if (id !== null && id !== undefined && id !== "") {
            dispatch(getProductAllImagesAsync(id))
            dispatch(getSingleProductByIdAsync(id))

        }
    }, [id])

    const handleDeleteImage = async (image: Images) => {
        if (image !== null && image !== undefined) {
            const result = await dispatch(deleteProductImageAsync(image.id));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success(`Image is deleted successfully`);
            } else if (result.meta.requestStatus === "rejected") {
                toast.error(`Image could not deleted`);
            }
        }
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    if (!user) {
        return <Login />;
    }
    if (user && user && user.role !== "Admin") {
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
            <ToastContainer />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "2em",
                }}
            >
                <Box>
                    <Button variant="contained" onClick={handleNavigateBack}>
                        Back
                    </Button>
                </Box>
                <Box>
                    <CreateImageModel id={id || ''} />
                </Box>


            </Box>

            <Typography variant="h4" gutterBottom>
                {product?.title}
            </Typography>
            <Paper elevation={3} style={{ marginTop: "20px" }}>
                <TableContainer>
                    <Table aria-label="Image table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {images &&
                                images.map((image) => (
                                    <TableRow key={image.id}>
                                        <TableCell>{image.imageUrl}</TableCell>
                                        <TableCell>
                                            {user?.role === "Admin" && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: "10",
                                                        margin: "1em"
                                                    }}
                                                >

                                                    <Stack sx={{ marginTop: "0.25em" }}>
                                                        <UpdateImageModel images={image} />
                                                    </Stack>
                                                    <Stack >
                                                        <Tooltip title="delete">
                                                            <IconButton onClick={e => { handleDeleteImage(image) }} size="large" color="error">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
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
        </Container>
    );
}
export default ProductImages;