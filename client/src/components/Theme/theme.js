import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

const theme = createMuiTheme({
  colors: {
    main: '#3f51b5',
    error: '#f44336',
    success: '#4caf50',
    like: 'rgb(219, 86, 91)',
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const Theme = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
