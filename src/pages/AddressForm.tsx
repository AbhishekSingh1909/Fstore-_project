import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../app/hooks/useAppDispatch';
import { useAppSelector } from '../app/hooks/useAppSelector';
import { Box, Button, CircularProgress } from '@mui/material';
import { CreateAddress } from '../types/Address';
import { createAddressAsync } from '../redux/reducers/address/createAddressAsync';
import { toast } from 'react-toastify';
import { updateAddressAsync } from '../redux/reducers/address/updateAddressAsync';
import { getAddressAsync } from '../redux/reducers/address/getAddressAsync';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { NotAuthorized } from './NotAuthorizedUser';

export default function AddressForm() {
    const [flag, setFlag] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authReducer)
    const { address, error, loading } = useAppSelector(
        (state) => state.addressReducer
    );

    React.useEffect(() => {
        if (!user) {
            navigate("../login", { replace: true });
        }
        else if (flag) {
            dispatch(getAddressAsync());
            setFlag(false);
        }
    }, [flag == true])

    const defaultValues: DefaultValues<FormValues> = {
        house_no: "",
        street: "",
        city: "",
        postcode: "",
        country: "",
    };

    const formSchema = yup.object({
        house_no: yup.string().max(20).required("Required"),
        street: yup.string().max(30).required("Required"),
        city: yup.string().max(20).required("Required"),
        postcode: yup.string().max(20).required("Required"),
        country: yup.string().max(20).required("Required"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(formSchema),
    });
    const onFormSubmit: SubmitHandler<FormValues> = async (data, event) => {
        debugger;
        event?.preventDefault();

        const createAddress: CreateAddress = {
            houseNumber: data.house_no,
            street: data.street,
            postCode: data.postcode,
            city: data.city,
            country: data.country
        }
        const result = await dispatch(createAddressAsync(createAddress));
        debugger;
        if (result.meta.requestStatus === "fulfilled") {
            setFlag(true);
        } else if (result.meta.requestStatus === "rejected") {
            toast.error(`Address could not created`);
        }
        reset(defaultValues);
    };

    if (!user) {
        debugger;
        navigate("../login", { replace: true });
    }
    if (loading) {
        debugger;
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
    if (user && user && user.role !== "Customer") {
        return <NotAuthorized />;
    }
    return (
        <React.Fragment>
            <Box
                component="form"
                onSubmit={handleSubmit(onFormSubmit)}
                sx={{ mt: 1 }}
            >
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="houseNo"
                        label="House Number"
                        fullWidth
                        autoComplete="shipping house_number"
                        variant="standard"
                        value={address?.houseNumber || user?.address?.houseNumber}
                        {...register("house_no")}
                    />
                    {errors.house_no && (
                        <Typography color="red">{errors.house_no.message}</Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="street"
                        label="street"
                        fullWidth
                        autoComplete="shipping street"
                        variant="standard"
                        value={address?.street || user?.address?.street}
                        {...register("street")}
                    />
                    {errors.street && (
                        <Typography color="red">{errors.street.message}</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={address?.city || user?.address?.city}
                        {...register("city")}
                    />
                    {errors.city && (
                        <Typography color="red">{errors.city.message}</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={address?.postCode || user?.address?.postCode}
                        {...register("postcode")}
                    />
                    {errors.postcode && (
                        <Typography color="red">{errors.postcode.message}</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={address?.country || user?.address?.country}
                        {...register("country")}
                    />
                    {errors.country && (
                        <Typography color="red">{errors.country.message}</Typography>
                    )}
                </Grid>

                <Grid>
                    {user && (!user?.address && !address) && (<Button variant="contained" endIcon={<SendIcon />} type="submit">
                        Save
                    </Button>)}

                </Grid>
            </Box>
        </React.Fragment >
    );
}

interface FormValues {
    house_no: string;
    street: string,
    city: string;
    postcode: string;
    country: string
}