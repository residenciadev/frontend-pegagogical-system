import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import category from './category/sagas';
import subcategory from './subcategory/sagas';
import search from './search/sagas';
import qrcode from './qrcode/sagas';

export default function* rootSaga() {
  return yield all([auth, user, category, subcategory, search, qrcode]);
}
