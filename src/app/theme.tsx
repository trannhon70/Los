import { createTheme } from "@mui/material/styles";



const theme = createTheme({
  palette: {
    primary: {
      main: "#1825aa"
    },
    secondary: {
      main: "#353535"
    },
    error: {
      main: "#eb0029"
    },
    success: {
      main: "#069549"
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mscb-white)',
          left: 'var(--mscb-sidebar-width)',
          width: 'calc(100% - var(--mscb-sidebar-width))'
        }
      }
    }
  }
});

export default theme;