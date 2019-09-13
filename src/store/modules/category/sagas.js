import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { getCategorySuccess, createCategorySuccess } from './actions';

export function* getCategory() {
  try {
    const response = yield call(api.get, 'category');

    yield put(getCategorySuccess(response.data));
  } catch (error) {
    toast.error('Erro ao carregar a categoria');
  }
}
export function* createCategory({ payload }) {
  try {
    const { name } = payload;
    const response = yield call(api.post, 'category', { name });

    toast.success('Nova pasta criada com sucesso');
    yield put(createCategorySuccess(response.data));
  } catch (error) {
    toast.error('Erro ao carregar a categoria');
  }
}

export default all([
  takeLatest('@category/CREATE_CATEGORY_REQUEST', createCategory),
  takeLatest('@category/GET_CATEGORY_REQUEST', getCategory),
]);
