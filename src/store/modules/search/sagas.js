import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { getCategorySuccess } from '../category/actions';
import { getSubcategorySuccess } from '../subcategory/actions';
import { getQrcodeSuccess } from '../qrcode/actions';

export function* getSearch({ payload }) {
  try {
    const { type, params, id } = payload;

    if (type === 'subcategory' && id) {
      const response = yield call(
        api.get,
        `${type}?categoryId=${id}&name=${params}`
      );
      yield put(getSubcategorySuccess(response.data));
    }

    if (type === 'category') {
      const response = yield call(api.get, `${type}?name=${params}`);
      yield put(getCategorySuccess(response.data));
    }

    if (type === 'qrcode' && id) {
      const response = yield call(
        api.get,
        `${type}?subcategoryId=${id}&name=${params}`
      );
      yield put(getQrcodeSuccess(response.data));
    }
  } catch (error) {
    toast.error('Erro ao carregar a categoria');
  }
}

export default all([takeLatest('@search/GET_SEARCH_REQUEST', getSearch)]);
