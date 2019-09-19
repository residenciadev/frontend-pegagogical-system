import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { getUserSuccess } from './actions';

export function* getUser({ payload }) {
  const response = yield call(api.get, 'member');

  yield put(getUserSuccess(response.data));
}

export default all([takeLatest('@user/GET_USER_REQUEST', getUser)]);
