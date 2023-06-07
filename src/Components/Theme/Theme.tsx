import { createTheme } from "@mui/material/styles";

var style = getComputedStyle(document.body);
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
    /* mode: "dark", */
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          /* "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          }, */
        },
      },
    },
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
