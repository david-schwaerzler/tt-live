import { Button, createTheme, responsiveFontSizes } from "@mui/material";
import { green, orange } from "@mui/material/colors";


const defaultTheme = createTheme({})

const theme = createTheme({
  palette: {

    mode: 'light',
    primary: {
      main: orange[800]
    },
    secondary: {
      main: green[500]
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      "& strong": {
        color: orange[800],
        fontSize: "3rem"
      },
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: "5rem",
        "& strong": {
          color: orange[800],
          fontSize: "5.5rem"
        }
      },
    },
    h2: {
      fontSize: "1.5rem",
      "& strong": {
        color: orange[800],
        fontSize: "2rem"
      },
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: "2rem",
        "& strong": {
          color: orange[800],
          fontSize: "2.5rem"
        },
      }
    },
    h3: {
      fontSize: "1rem",
      "& strong": {
        color: orange[800],
        fontSize: "1.5rem"
      },
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: "1.5rem",
        "& strong": {
          color: orange[800],
          fontSize: "2rem"
        },
      }
    },

  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({

      }),
    },  
    MuiCardContent: {
      styleOverrides:{
        root: {
          padding: defaultTheme.spacing(2),         
        }
      }
    },
    MuiCardActions: {
      styleOverrides:{
        root: {
          padding: defaultTheme.spacing(0),         
        }
      }
    }
  },
  
});

export default theme;