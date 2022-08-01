import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#003986",
      transparent: `rgba(0, 57, 134, 0.7)`,
    },
    secondary: {
      main: "#5F99E7",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
