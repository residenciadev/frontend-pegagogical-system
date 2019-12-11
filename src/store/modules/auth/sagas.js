import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';

// eslint-disable-next-line import/no-cycle
import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    const userSpreed = user[0];

    yield put(signInSuccess(token.token, userSpreed));
    history.push('/');
  } catch (error) {
    toast.error('Verifique seu e-mail/senha!');
    yield put(signFailure(error));
  }
}

export function* forgotPassword({ payload }) {
  try {
    const { email } = payload;

    yield call(api.post, 'resetpassword', {
      email,
      redirect_url: 'http://localhost:3000/resetpassword',
    });
    toast.success('Enviamos para seu e-mail um token de recuperação de senha!');
    history.push('/');
  } catch (error) {
    toast.error('Verifique seu e-mail/senha!');
    yield put(signFailure(error));
  }
}

export function* resetPassword({ payload }) {
  try {
    const { token, password } = payload;

    yield call(api.put, `resetpassword${token}`, {
      password,
    });
    toast.success('Sua senha foi resetada com sucesso!');
    history.push('/');
  } catch (error) {
    toast.error('Seu token está expirado!');
    yield put(signFailure(error));
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/FORGOT_PASSWORD_REQUEST', forgotPassword),
  takeLatest('@auth/RESET_PASSWORD_REQUEST', resetPassword),
]);
