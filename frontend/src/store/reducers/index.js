import { combineReducers } from 'redux';
import appReducer from './appReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  app: appReducer,
  err: errorReducer,
  auth: authReducer,
});
