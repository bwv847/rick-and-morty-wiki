import { colors, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(255, 214, 10)',
      contrastText: colors.blueGrey[900],
    },
    secondary: {
      main: 'rgb(52, 199, 89)',
      contrastText: colors.blueGrey[900],
    },
    background: {
      default: '#f1f1f1',
      paper: '#ffffff',
    },
  },
});

export default theme;
