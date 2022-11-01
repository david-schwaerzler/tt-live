import { createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    
    mode: 'dark',
    primary: {
      main: orange[800]
    },
    secondary: {
      main: green[500]
    },
  }
});

export default theme;