import { combineReducers } from 'redux';

import contacts from './contacts';
import login from './login';

const appReducer = combineReducers({
  contacts,
  login
});

export default appReducer;
