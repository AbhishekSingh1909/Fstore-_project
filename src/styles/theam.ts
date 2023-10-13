import createTheme from "@mui/material/styles/createTheme";

export const onlineStoreSiteTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      // default: "#3f51b5",
      paper: "#90caf9",
    },
  },
  typography: {
    h1: {
      fontFamily: "Rowdies",
      fontSize: "relative",
    },
    h2: {
      fontFamily: "IBM Plex Mono",
      fontSize: "2.8rem",
      padding: "1.3em 0em 0.3em 0em",
    },
    h3: {
      fontFamily: "IBM Plex Mono",
      fontSize: "1.8em",
    },
    button: {
      fontSize: "0.8em",
      fontFamily: "Rowdies",
    },
    // body1: {
    //   padding: "20px",
    // },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#fef3c7",
        },
      },
    },
  },
});
