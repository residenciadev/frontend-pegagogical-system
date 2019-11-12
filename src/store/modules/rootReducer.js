import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import theme from './theme/reducer';
import save from './save/reducer';

const reducers = combineReducers({
  auth,
  user,
  theme,
  save,
});

export default reducers;
