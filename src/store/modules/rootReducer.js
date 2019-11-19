import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import theme from './theme/reducer';
import save from './save/reducer';
import notification from './notification/reducer';

const reducers = combineReducers({
  auth,
  user,
  notification,
  theme,
  save,
});

export default reducers;
