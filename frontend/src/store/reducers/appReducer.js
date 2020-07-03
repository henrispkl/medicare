import { SET_VIEWBAR } from '../actions/actionTypes';

const initialState = { viewBar: false };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWBAR:
      return { ...state, viewBar: action.payload };
    default:
      return state;
  }
};

export default appReducer;
