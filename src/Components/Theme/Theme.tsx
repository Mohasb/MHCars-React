import { createTheme } from "@mui/material/styles";

const style = getComputedStyle(document.body);
const primaryColor = style.getPropertyValue("--primary-color");
const secondaryColor = style.getPropertyValue("--secondary-color");

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#fff",
          color: "black",
          border: "1px solid black",
        },
      },
    },
  },
});
