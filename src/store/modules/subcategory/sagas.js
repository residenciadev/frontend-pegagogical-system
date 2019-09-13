import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { getSubcategorySuccess, createSubcategorySuccess } from './actions';

export function* getSubcategory({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `subcategory?categoryId=${id}`);

    yield put(getSubcategorySuccess(response.data));
  } catch (error) {
    toast.error('Erro ao carregar a subpasta');
  }
}
export function* createSubcategory({ payload }) {
  try {
    const { name, categoryId } = payload;
    const response = yield call(api.post, 'subcategory', {
      category_id: categoryId,
      name,
    });

    toast.success('Nova subpasta criada com sucesso');
    yield put(createSubcategorySuccess(response.data));
  } catch (error) {
    toast.error('Erro ao carregar a subpasta');
  }
}

export default all([
  takeLatest('@subcategory/CREATE_SUBCATEGORY_REQUEST', createSubcategory),
  takeLatest('@subcategory/GET_SUBCATEGORY_REQUEST', getSubcategory),
]);
