import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import category from './category/reducer';
import subcategory from './subcategory/reducer';
import qrcode from './qrcode/reducer';
import search from './search/reducer';
import theme from './theme/reducer';
import save from './save/reducer';

const reducers = combineReducers({
  auth,
  user,
  theme,
  save,
  category,
  subcategory,
  search,
  qrcode,
});

export default reducers;
