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
  const access_token = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (access_token !== null) {
      dispatch(authenticateUserAsync(access_token));
    }
  }, [access_token]);
  return (
    <StyledEngineProvider injectFirst>
      {/* <ThemeProvider theme={onlineStoreSiteTheme}>
        
      </ThemeProvider> */}
      <Header />
      <Outlet />
      <Footer />
    </StyledEngineProvider>
  );
};

export default Root;
