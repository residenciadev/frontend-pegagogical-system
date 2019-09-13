import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import category from './category/reducer';
import subcategory from './subcategory/reducer';
import qrcode from './qrcode/reducer';
import search from './search/reducer';

const reducers = combineReducers({
  auth,
  user,
  category,
  subcategory,
  search,
  qrcode,
});

export default reducers;
