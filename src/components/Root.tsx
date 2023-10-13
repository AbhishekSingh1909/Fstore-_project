import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import { onlineStoreSiteTheme } from "../styles/theam";
import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect } from "react";

const Root = () => {
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
