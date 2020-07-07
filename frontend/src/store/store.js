import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {};

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, initialState, composeEnhancer);

export default store;
