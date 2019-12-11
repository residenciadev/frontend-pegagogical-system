import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './config/reactotronConfig';
import 'react-quill/dist/quill.snow.css';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './services/history';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { store, persistor } from './store';

function App() {
  const { loading } = store.getState().auth;

  return (
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        <Router history={history}>
          <GlobalStyle />
          <Routes />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
