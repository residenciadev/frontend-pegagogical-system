import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import {
  getUserSuccess,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';

export function* getUser({ payload }) {
  const response = yield call(api.get, 'member');

  yield put(getUserSuccess(response.data));
}

export function* updateProfile({ payload }) {
  try {
    const { name, email, dropbox_id, ...rest } = payload.data;
    const { id } = payload;

    const profile = {
      name,
      email,
      dropbox_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `users/${id}`, profile);

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
    toast.error('Erro ao atualizar o perfil');
  }
}
export default all([
  takeLatest('@user/GET_USER_REQUEST', getUser),
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
