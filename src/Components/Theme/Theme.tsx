import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: "#F4B408"
        },
        secondary: {
            main: "#0c3675"
        }
    },
    components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none"
              }
            }
          }
        }
      }
})