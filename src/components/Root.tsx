import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import { onlineStoreSiteTheme } from "../styles/theam";
import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { authenticateUserAsync } from "../redux/reducers/userAuthentication/authenticateUserAsync";

const Root = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("comes from here");
    const access_token = localStorage.getItem("access_token");
    if (access_token !== null) {
      console.log("access token", access_token);
      dispatch(authenticateUserAsync(access_token));
    }
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={onlineStoreSiteTheme}>
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Root;
