import { createMuiTheme } from '@material-ui/core';

const getTheme = () => {
  const { theme } = JSON.parse(localStorage.getItem('persist:pedagogical'));
  const mode = JSON.parse(theme);
  return `${mode.theme}`;
};

const theme = createMuiTheme({
  palette: {
    type: getTheme(),
    primary: {
      light: '#757ce8',
      main: '#061831',
      dark: '#2e3236',
      contrastText: '#fff',
    },
    background: {
      dark: '#1f2224',
      light: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme;
