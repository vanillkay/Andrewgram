import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // @ts-ignore
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

// @ts-ignore
const Theme = (props) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export { Theme };
