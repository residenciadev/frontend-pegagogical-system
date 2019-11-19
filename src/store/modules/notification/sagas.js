import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { getNotificationSuccess, notificationFailure } from './actions';

export function* getNotification({ payload }) {
  try {
    const { page, limit } = payload;
    const response = yield call(
      api.get,
      `notifications?page=${page}&limit=${limit}`
    );

    yield put(getNotificationSuccess(response.data));
  } catch (error) {
    yield put(notificationFailure());
  }
}

export default all([
  takeLatest('@notification/GET_NOTIFICATION_REQUEST', getNotification),
]);
