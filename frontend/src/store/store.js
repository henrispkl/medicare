import { createStore } from 'redux';
import appReducer from './reducers/appReducer';

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(appReducer, composeEnhancer);

export default store;
