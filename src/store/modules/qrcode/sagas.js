import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { getQrcodeSuccess } from './actions';

export function* getQrcode({ payload }) {
  try {
    const { subcategoryId } = payload;

    const response = yield call(
      api.get,
      `/qrcode?subcategoryId=${subcategoryId}`
    );

    yield put(getQrcodeSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao carregar os Qrcode');
  }
}

export default all([takeLatest('@qrcode/GET_QRCODE_REQUEST', getQrcode)]);
