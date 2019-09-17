import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './config/reactotronConfig';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './services/history';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { store, persistor } from './store';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './styles/theme';

function App() {
  const { loading } = store.getState().auth;

  return (
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
            <GlobalStyle />
            <ToastContainer autoClose={3000} />
          </MuiThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
