import { createMuiTheme } from '@material-ui/core';

import { yellow, lightBlue, green } from '@material-ui/core/colors';

const getTheme = () => {
  const { theme } = JSON.parse(localStorage.getItem('persist:pedagogical'));
  const mode = JSON.parse(theme);
  return `${mode.theme}`;
};

const theme = createMuiTheme({
  palette: {
    type: getTheme(),
    primary: {
      light: '#061831',
      main: lightBlue[600],
      dark: '#2e3236',
      contrastText: '#fff',
    },
    background: {
      dark: '#1f2224',
      light: '#ffff',
    },
    alert: {
      light: yellow[800],
      success: green[600],
      blue: lightBlue[600],
      red: '#f44336',
    },

    paper: {
      light: '#FFFFFF',
      dark: '#2E3236',
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
